const { BadRequest } = require('@feathersjs/errors');

module.exports = function chargeCoinsForSettingOnline() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { studentId } = context.params.payload;

    const [student, onlineAds] = await Promise.all([
      context.app.service('students').get(studentId),
      context.app.service('student-ads').find({
        query: {
          studentId,
          onlineAt: { $ne: null },
          removedAt: { $exists: false },
          expiredAt: { $exists: false },
          $limit: 0,
        },
      }),
    ]);

    const { freeAdsQuota, coinsPerAdCreation } = studentSettings;

    if (onlineAds.total >= freeAdsQuota / coinsPerAdCreation) {
      if (student.coin < coinsPerAdCreation) {
        throw new BadRequest('Not enough coins');
      }

      await context.app.service('coin-transactions').create({
        method: 'out',
        type: 'post-student-ad',
        handledBy: 'system',
        ownerType: 'student',
        ownerId: studentId,
        description: `Charged ${coinsPerAdCreation} coins for posting an Ad.`,
        ref: 'student-ads',
        refId: context.id,
        amount: coinsPerAdCreation,
      });
    }

    return context;
  };
};

const { BadRequest } = require('@feathersjs/errors');

module.exports = function chargeCoins() {
  return async context => {
    const { studentId } = context.params.payload;
    const [student, appSettings, onlineAds] = await Promise.all([
      context.app.service('students').get(studentId),
      context.app
        .service('app-settings')
        .find({ query: { platform: 'student' } }),
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
    const { freeAdsQuota, coinsPerAdCreation } = appSettings.data[0];

    if (onlineAds.total >= freeAdsQuota / coinsPerAdCreation) {
      if (student.coin < coinsPerAdCreation) {
        throw new BadRequest('Not enough coins');
      }

      await context.app.service('coin-transactions').create({
        type: 'out',
        ownerType: 'student',
        studentId,
        description: `Charged ${coinsPerAdCreation} coins for activate an Ad.`,
        ref: 'system',
        amount: coinsPerAdCreation,
      });
    }

    return context;
  };
};

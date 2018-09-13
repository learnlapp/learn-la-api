const { BadRequest } = require('@feathersjs/errors');

module.exports = function chargeCoinsForSettingOnline() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { teacherId } = context.params.payload;

    const [teacher, onlineAds] = await Promise.all([
      context.app.service('teachers').get(teacherId),
      context.app.service('course-ads').find({
        query: {
          teacherId,
          onlineAt: { $ne: null },
          removedAt: { $exists: false },
          expiredAt: { $exists: false },
          $limit: 0,
        },
      }),
    ]);

    const { freeAdsQuota, coinsPerAdCreation } = teacherSettings;

    if (onlineAds.total >= freeAdsQuota / coinsPerAdCreation) {
      if (teacher.coin < coinsPerAdCreation) {
        throw new BadRequest('Not enough coins');
      }

      const res = await context.app.service('coin-transactions').create({
        method: 'out',
        type: 'post-course-ad',
        handledBy: 'system',
        ownerType: 'teacher',
        ownerId: teacherId,
        description: `Charged ${coinsPerAdCreation} coins for posting an Ad.`,
        ref: 'course-ads',
        refId: context.id,
        amount: coinsPerAdCreation,
      });
    }

    return context;
  };
};

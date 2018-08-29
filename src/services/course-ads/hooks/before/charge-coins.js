const { BadRequest } = require('@feathersjs/errors');

module.exports = function chargeCoins() {
  return async context => {
    const { teacherId } = context.params.payload;
    const [teacher, appSettings, onlineAds] = await Promise.all([
      context.app.service('teachers').get(teacherId),
      context.app
        .service('app-settings')
        .find({ query: { platform: 'teacher' } }),
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
    const { freeAdsQuota, coinsPerAdCreation } = appSettings.data[0];

    if (onlineAds.total >= freeAdsQuota / coinsPerAdCreation) {
      if (teacher.coin < coinsPerAdCreation) {
        throw new BadRequest('Not enough coins');
      }

      await context.app.service('coin-transactions').create({
        type: 'out',
        ownerType: 'teacher',
        teacherId,
        description: `Charged ${coinsPerAdCreation} coins for activate an Ad.`,
        ref: 'system',
        amount: coinsPerAdCreation,
      });
    }

    return context;
  };
};

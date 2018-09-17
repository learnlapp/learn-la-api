const { BadRequest, GeneralError } = require('@feathersjs/errors');

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

    const freeAdsQuota = teacherSettings.coin.free.launchAd;
    const coinsForLaunchingAd = teacherSettings.coin.pricing.launchAd;

    if (!coinsForLaunchingAd) {
      throw new GeneralError('coinsForLaunchingAd could not be null or 0');
    }

    if (onlineAds.total >= freeAdsQuota / coinsForLaunchingAd) {
      if (!teacher.coin || teacher.coin < coinsForLaunchingAd) {
        throw new BadRequest('Not enough coins');
      }

      const res = await context.app.service('coin-transactions').create({
        method: 'out',
        type: 'launch-ad',
        handledBy: 'system',
        ownerType: 'teacher',
        ownerId: teacherId,
        description: `Charged ${coinsForLaunchingAd} coins for posting an Ad.`,
        ref: 'course-ads',
        refId: context.id,
        amount: coinsForLaunchingAd,
      });
    }

    return context;
  };
};

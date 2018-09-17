const { BadRequest, GeneralError } = require('@feathersjs/errors');

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

    const freeAdsQuota = studentSettings.coin.free.launchAd;
    const coinsForLaunchingAd = studentSettings.coin.pricing.launchAd;

    if (!coinsForLaunchingAd) {
      throw new GeneralError('coinsForLaunchingAd could not be null or 0');
    }

    if (onlineAds.total >= freeAdsQuota / coinsForLaunchingAd) {
      if (!student.coin || student.coin < coinsForLaunchingAd) {
        throw new BadRequest('Not enough coins');
      }

      await context.app.service('coin-transactions').create({
        method: 'out',
        type: 'launch-ad',
        handledBy: 'system',
        ownerType: 'student',
        ownerId: studentId,
        description: `Charged ${coinsForLaunchingAd} coins for posting an Ad.`,
        ref: 'student-ads',
        refId: context.id,
        amount: coinsForLaunchingAd,
      });
    }

    return context;
  };
};

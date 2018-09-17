const { BadRequest, GeneralError, NotFound } = require('@feathersjs/errors');

module.exports = function chargeCoinsForSettingOnline() {
  return async context => {
    const { payload } = context.params;
    const settings = context.app.get('appSettings')[payload.platform];

    const coinsPerMatching = settings.coin.pricing.matching;
    const { coin, freeApplyQuotaLeft } = context.params.user;

    if (!coinsPerMatching) {
      throw new GeneralError('coinsPerMatching cannot be <= 0 or null.');
    }

    if (
      (!freeApplyQuotaLeft && !coin) ||
      (!freeApplyQuotaLeft && coin - coinsPerMatching < 0)
    ) {
      throw new BadRequest('Not enough coins');
    }

    if (freeApplyQuotaLeft - coinsPerMatching >= 0) {
      const a = await context.app
        .service(`${payload.platform}s`)
        .patch(payload[`${payload.platform}Id`], {
          $inc: { freeApplyQuotaLeft: -coinsPerMatching },
        });
    } else {
      const transaction = await context.app
        .service('coin-transactions')
        .create({
          method: 'out',
          type: 'create-matching',
          handledBy: 'system',
          ownerType: payload.platform,
          ownerId: payload[`${payload.platform}Id`],
          description: `Charged ${coinsPerMatching} coins for a matching.`,
          ref: 'matchings',
          refId: context.result._id,
          amount: coinsPerMatching,
        });
    }

    return context;
  };
};

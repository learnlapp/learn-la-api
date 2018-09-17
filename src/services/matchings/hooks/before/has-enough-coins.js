const { BadRequest, GeneralError, NotFound } = require('@feathersjs/errors');

module.exports = function chargeCoinsForSettingOnline() {
  return async context => {
    const { payload } = context.params;
    const settings = context.app.get('appSettings')[payload.platform];

    const user = await context.app
      .service(`${payload.platform}s`)
      .get(payload[`${payload.platform}Id`]);

    if (!user) {
      throw new NotFound(`${payload.platform} not found.`);
    }

    const coinsPerMatching = settings.coin.pricing.matching;
    const { coin, freeApplyQuotaLeft } = user;

    if (!coinsPerMatching) {
      throw new GeneralError('coinsPerMatching cannot be <= 0 or null.');
    }

    if (
      (!freeApplyQuotaLeft && !coin) ||
      (!freeApplyQuotaLeft && coin - coinsPerMatching < 0)
    ) {
      throw new BadRequest('Not enough coins');
    }

    context.params.user = user;
    return context;
  };
};

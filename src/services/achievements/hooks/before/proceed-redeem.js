const { Forbidden, NotFound } = require('@feathersjs/errors');

module.exports = function redeem() {
  return async context => {
    const { payload } = context.params;

    const achievement = await context.app
      .service('achievements')
      .get(context.id);
    if (!achievement) {
      throw new NotFound();
    }

    const { ownerType, ownerId, status } = achievement;

    if (
      ownerType !== payload.platform ||
      !ownerId.equals(payload[`${payload.platform}Id`])
    ) {
      throw new Forbidden();
    }

    context.data = {};
    if (status === 'new') {
      context.data = { status: 'redeemed' };
      context.params.action = 'redeemed';
    }

    return context;
  };
};

const { GeneralError, NotAcceptable } = require('@feathersjs/errors');
module.exports = function refrehParamsEntity(platform) {
  return async context => {
    const { user, payload } = context.params;

    if (!platform) {
      throw new GeneralError(`Missing argument 'platform.'`);
    }

    if (payload && payload.platform !== platform) {
      throw new GeneralError('platform not match.');
    }

    context.params.user = await context.app
      .service(`${platform}s`)
      .get(user._id);

    return context;
  };
};

const {
  Forbidden,
  GeneralError,
  NotAuthenticated,
  NotFound,
} = require('@feathersjs/errors');

module.exports = function _restrict(options = {}) {
  return async context => {
    const { ownerField } = options;
    const { payload } = context.params;

    if (!ownerField) {
      throw new GeneralError('ownerField could not be null.');
    }

    if (!payload.platform) {
      throw new NotAuthenticated();
    }

    const record = await context.app
      .service(context.path)
      .get(context.id, { fastJoinQuery: { owner: false } });
    console.log('record', record);
    console.log('pay', payload[`${payload.platform}Id`]);

    if (!record) {
      throw new NotFound();
    }

    if (!record[ownerField].equals(payload[`${payload.platform}Id`])) {
      throw new Forbidden('restricted to owner only.');
    }

    return context;
  };
};

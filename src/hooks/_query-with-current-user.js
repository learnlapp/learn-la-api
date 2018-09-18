module.exports = function _queryWithCurrentUser() {
  return context => {
    const { payload, query } = context.params;

    context.params.query = {
      ...query,
      ownerType: payload.platform,
      ownerId: payload[`${payload.platform}Id`],
    };

    return context;
  };
};

module.exports = function() {
  return context => {
    if (
      context.params &&
      context.params.payload &&
      Object.keys(context.params.payload).length > 0
    ) {
      delete context.params.payload.userId;
      console.log('pushPayloadToUser user', context.params.user);
      console.log('pushPayloadToUser payload', context.params.payload);

      context.params.user = { ...context.params.payload };
      console.log('pushPayloadToUser', context.params.user);
      f;
    }
    return context;
  };
};

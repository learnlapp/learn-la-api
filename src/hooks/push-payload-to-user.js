module.exports = function() {
  return context => {
    if (
      context.params &&
      context.params.payload &&
      Object.keys(context.params.payload).length > 0
    ) {
      delete context.params.payload.userId;
      context.params.user = { ...context.params.payload };
    }
    return context;
  };
};

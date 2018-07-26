module.exports = function extractAndUpdateUserInfo() {
  return async context => {
    const { user } = context.data;
    const params = { ...context.params.user };

    if (user) {
      const res = await context.app
        .service('users')
        .patch(context.params.user._id, context.data.user, context.params);

      delete context.data.user;
    }

    return context;
  };
};

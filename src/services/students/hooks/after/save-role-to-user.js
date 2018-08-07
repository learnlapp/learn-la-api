module.exports = function saveRoleToUser() {
  return async context => {
    const { userId } = context.result;

    await context.app.service('users').patch(userId, {
      $push: {
        roles: 'student',
      },
    });

    return context;
  };
};

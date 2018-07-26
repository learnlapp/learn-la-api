module.exports = function saveRoleToUser() {
  return async context => {
    const { userId } = context.result;
    console.log('---- save role to user ----');
    await context.app.service('users').patch(userId, {
      $push: {
        roles: 'teacher',
      },
    });

    return context;
  };
};

module.exports = function saveTeacherToUser() {
  return async context => {
    const { _id, userId } = context.result;

    await context.app.service('users').patch(userId, {
      teacherId: _id,
      $push: {
        roles: 'teacher',
      },
    });

    return context;
  };
};

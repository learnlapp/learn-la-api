module.exports = function saveStudentToUser() {
  return async context => {
    const { _id, userId } = context.result;

    await context.app.service('users').patch(userId, {
      studentId: _id,
      $push: {
        roles: 'student',
      },
    });

    return context;
  };
};

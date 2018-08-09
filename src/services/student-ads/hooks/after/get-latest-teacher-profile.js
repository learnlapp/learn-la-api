module.exports = function getLatestTeacherProfile() {
  return async context => {
    const { teacherId } = context.params.user;

    context.params.profile = await context.app
      .service('students')
      .get(teacherId);
    return context;
  };
};

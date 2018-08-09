module.exports = function getLatestStudentProfile() {
  return async context => {
    const { studentId } = context.params.payload;

    context.params.profile = await app.service('students').get(studentId);
    return context;
  };
};

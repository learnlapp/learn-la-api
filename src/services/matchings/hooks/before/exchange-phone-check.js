const { BadRequest, Forbidden } = require('@feathersjs/errors');

module.exports = function exchangePhoneCheck() {
  return async context => {
    const { isStudentPhoneGiven, isTeacherPhoneGiven } = context.data;

    if (!isStudentPhoneGiven && !isTeacherPhoneGiven) {
      return context;
    }

    if (isStudentPhoneGiven && isTeacherPhoneGiven) {
      throw new BadRequest(
        'isStudentPhoneGiven and isTeacherPhoneGiven cannot be set at the same time'
      );
    }

    const { studentId, teacherId } = context.params.payload;

    if (isStudentPhoneGiven && !studentId) {
      throw new Forbidden();
    }

    if (isTeacherPhoneGiven && !teacherId) {
      throw new Forbidden();
    }

    return context;
  };
};

const { BadRequest } = require('@feathersjs/errors');

module.exports = function associateUsers() {
  return async context => {
    const { courseAdId, studentAdId } = context.data;
    const { payload } = context.params;

    if ((!courseAdId && !studentAdId) || (courseAdId && studentAdId)) {
      throw new BadRequest(
        'Either courseAdId or studentAdId should be provided.',
      );
    }

    if (
      (courseAdId && !payload.studentId) ||
      (studentAdId && !payload.teacherId)
    ) {
      throw new BadRequest('Platform incompatible');
    }

    if (courseAdId) {
      const { teacherId } = await context.app
        .service('course-ads')
        .get(courseAdId, context.params);
      context.data.teacherId = teacherId;
      context.data.studentId = payload.studentId;
      context.data.type = 'course';
      return context;
    }

    if (studentAdId) {
      const { studentId } = await context.app
        .service('student-ads')
        .get(studentAdId, context.params);
      context.data.teacherId = payload.teacherId;
      context.data.studentId = studentId;
      context.data.type = 'student';
      return context;
    }
  };
};

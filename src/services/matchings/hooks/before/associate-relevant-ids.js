const { BadRequest, MethodNotAllowed } = require('@feathersjs/errors');

module.exports = function associateRelevantIds() {
  return async context => {
    const { courseAdId, studentAdId } = context.data;
    const { payload } = context.params;

    if ((!courseAdId && !studentAdId) || (courseAdId && studentAdId)) {
      throw new BadRequest(
        'Either courseAdId or studentAdId should be provided.'
      );
    }

    if (
      (courseAdId && !payload.studentId) ||
      (studentAdId && !payload.teacherId)
    ) {
      throw new MethodNotAllowed();
    }

    if (courseAdId) {
      const { teacherId } = await context.app
        .service('course-ads')
        .get(courseAdId);

      context.data = {
        ...context.data,
        type: 'course',
        teacherId,
        studentId: payload.studentId,
      };

      return context;
    }

    if (studentAdId) {
      const { studentId } = await context.app
        .service('student-ads')
        .get(studentAdId);

      context.data = {
        ...context.data,
        type: 'student',
        teacherId: payload.teacherId,
        studentId,
      };

      return context;
    }
  };
};

const { Forbidden, NotFound } = require('@feathersjs/errors');

module.exports = function isOwner() {
  return async context => {
    const { studentId, teacherId } = context.params.payload;

    const matching = await context.app.service('matchings').get(context.id, {
      fastJoinQuery: {
        student: false,
        teacher: false,
        unreadStudentLogsCount: false,
        unreadTeacherLogsCount: false,
      },
    });

    if (!matching) {
      throw new NotFound();
    }

    if (studentId && !matching.studentId.equals(studentId)) {
      throw new Forbidden();
    }

    if (teacherId && !matching.teacherId.equals(teacherId)) {
      throw new Forbidden();
    }

    return context;
  };
};

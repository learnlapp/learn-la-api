module.exports = function initLogMsgs() {
  return async context => {
    const { _id, type } = context.result;

    let from;
    if (type === 'course') {
      from = 'student';
    }

    if (type === 'student') {
      from = 'teacher';
    }

    const [logForStudent, logForTeacher] = await Promise.all([
      context.app.service('matching-logs').create({
        matchingId: _id,
        from,
        to: 'student',
        logId: 'invitationMsg',
      }),
      context.app.service('matching-logs').create({
        matchingId: _id,
        from,
        to: 'teacher',
        logId: 'invitationMsg',
      }),
    ]);

    context.result.latestLogForStudentCreatedAt = logForStudent.createdAt;
    context.result.latestLogForTeacherCreatedAt = logForTeacher.createdAt;

    return context;
  };
};

module.exports = function saveLatestLogTime() {
  return async context => {
    const { matchingId, to, createdAt } = context.result;

    if (to === 'student') {
      await context.app.service('matchings').patch(
        matchingId,
        {
          latestLogForStudentCreatedAt: createdAt,
        },
        context.params
      );
    }

    if (to === 'teacher') {
      await context.app.service('matchings').patch(
        matchingId,
        {
          latestLogForTeacherCreatedAt: createdAt,
        },
        context.params
      );
    }

    return context;
  };
};

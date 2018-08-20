module.exports = function saveLatestLogTime() {
  return async context => {
    const { matchingId, to, createdAt } = context.result;

    if (to === 'student') {
      await context.app.service('matchings').patch(matchingId, {
        latestLogForStudentCreatedAt: createdAt,
      });
    }

    if (to === 'teacher') {
      await context.app.service('matchings').patch(matchingId, {
        latestLogForTeacherCreatedAt: createdAt,
      });
    }

    return context;
  };
};

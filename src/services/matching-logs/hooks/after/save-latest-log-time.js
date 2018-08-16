module.exports = function saveLatestLogTime() {
  return async context => {
    const { matchingId, to, createdAt } = context.result;

    if (to === 'student') {
      await context.app.service('matchings').patch(matchingId, {
        latestLogForStudentCreatedAt: createdAt,
      });
      console.log('3');
    }

    if (to === 'teacher') {
      await context.app.service('matchings').patch(matchingId, {
        latestLogForTeacherCreatedAt: createdAt,
      });
      console.log('4');
    }

    return context;
  };
};

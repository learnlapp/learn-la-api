module.exports = function initLogMsgs() {
  return async context => {
    const { _id, type } = context.result;

    let from;
    if (type === 'courseAd') {
      from = 'student';
    }

    if (type === 'studentAd') {
      from = 'teacher';
    }

    await Promise.all([
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

    return context;
  };
};

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

    const matchingLogs = [
      {
        matchingId: _id,
        from,
        to: 'student',
        logId: 'invitationMsg',
      },
      {
        matchingId: _id,
        from,
        to: 'teacher',
        logId: 'invitationMsg',
      },
    ];

    const res = await context.app.service('matching-logs').create(matchingLogs);
    return context;
  };
};

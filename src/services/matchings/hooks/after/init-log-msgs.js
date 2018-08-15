module.exports = function initLogMsgs() {
  return async context => {
    const { _id } = context.result;

    const matchingLogs = [
      { matchingId: _id, to: 'student', logId: 'invitationMsg' },
      { matchingId: _id, to: 'teacher', logId: 'invitationMsg' },
    ];
    console.log('start sending');
    context.app.service('matching-logs').create(matchingLogs);

    // const res = await context.app.service('matching-logs').create(matchingLogs);
    // console.log('res', res);
    // context.abc = res;
    return context;
  };
};

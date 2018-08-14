module.exports = function initLogMsgs() {
  return context => {
    const activityLogs = [
      { to: 'student', logId: 'invitationMsg' },
      { to: 'teacher', logId: 'invitationMsg' },
    ];

    context.data.activityLogs = activityLogs;

    return context;
  };
};

// const agenda = require('../../../../modules/agenda');
const messageList = require('../../../../modules/notification-messages');

module.exports = function setupScheduleTasks() {
  return context => {
    const agenda = context.app.get('agenda');
    const { type } = context.result;
    let message, to;

    if (type === 'courseAd') {
      message = messageList.teacher.reminder.matching.oneHourLeft;
      to = 'teacher';
      from = 'student';
    }

    if (type === 'studentAd') {
      message = messageList.student.reminder.matching.oneHourLeft;
      to = 'student';
      from = 'teacher';
    }

    agenda.schedule('after 2 minutes', 'sendOneHourLeftReminder', {
      matching: context.result,
      message,
      to,
      from,
    });

    agenda.schedule('after 5 minutes', 'autoArchiveMatching', {
      matching: context.result,
    });

    return context;
  };
};

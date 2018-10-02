const agenda = require('../../../../modules/agenda');
const messageList = require('../../../../modules/notification-messages');

module.exports = function scheduleTasks() {
  return context => {
    const { type } = context.result;
    let message, to;

    if (type === 'course') {
      message = messageList.teacher.reminder.matching.oneHourLeft;
      to = 'teacher';
      from = 'student';
    }

    if (type === 'student') {
      message = messageList.student.reminder.matching.oneHourLeft;
      to = 'student';
      from = 'teacher';
    }

    agenda.schedule('after 10 seconds', 'sendOneHourLeftReminder', {
      matching: context.result,
      message,
      to,
      from,
    });

    return context;
  };
};

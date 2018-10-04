module.exports = function scheduleResultInquiryMsg() {
  return async context => {
    const { _id } = context.result;
    const agenda = context.app.get('agenda');

    agenda.schedule('30 seconds', 'sendMatchingLog', {
      matchingId: _id,
      from: 'student',
      to: 'student',
      logId: 'resultInquiryMsg',
    });

    agenda.schedule('30 seconds', 'sendMatchingLog', {
      matchingId: _id,
      from: 'teacher',
      to: 'teacher',
      logId: 'resultInquiryMsg',
    });

    return context;
  };
};

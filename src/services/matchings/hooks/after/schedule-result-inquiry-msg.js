module.exports = function scheduleResultInquiryMsg() {
  return async context => {
    const { _id } = context.result;
    console.log('running inside scheduleResultInquiryMsg');

    console.log('params from client', context.params.action);
    const agenda = context.app.get('agenda');

    agenda.schedule('after 3 minutes', 'sendMatchingLog', {
      matchingId: _id,
      from: 'student',
      to: 'student',
      logId: 'resultInquiryMsg',
    });

    agenda.schedule('after 3 minutes', 'sendMatchingLog', {
      matchingId: _id,
      from: 'teacher',
      to: 'teacher',
      logId: 'resultInquiryMsg',
    });

    return context;
  };
};

const { sendNotification } = require('../../../../modules/oneSignal');
const messageList = require('../../../../modules/notification-messages');
const verificationTypes = require('../../../../modules/verification-types');

module.exports = function sendPushNotification() {
  return async context => {
    const { logId, matchingId, from, to, extra } = context.result;

    let matching = context.result.matching;
    if (!matching) {
      matching = await context.app
        .service('matchings')
        .get(matchingId, { fastJoinQuery: { student: 1, teacher: 1 } });

      if (!matching.length) {
        console.error(
          'matching not found, unable to send push notification to user.'
        );
        return context;
      }
    }

    const config = context.app.get('oneSignal')[to];
    const { oneSignalIds } = matching[to];
    const m_from = matching[from].name;

    let m_verificationType;
    if (extra && extra.type) {
      if (extra.course) {
        m_verificationType = `${extra.course.category}${
          extra.course.title
        }證明`;
      } else {
        m_verificationType = verificationTypes[to][extra.type];
      }
    }

    const { headings, contents, data } = messageList[to].matchingLog[logId];
    sendNotification({
      config,
      targetIds: oneSignalIds,
      headings: JSON.parse(eval(headings)),
      contents: JSON.parse(eval(contents)),
      data: { ...data, id: matchingId },
    });

    return context;
  };
};

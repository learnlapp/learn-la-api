const { sendNotification } = require('../../../../modules/oneSignal');
const messageList = require('../../../../modules/notification-messages');

module.exports = function sendPushNotification() {
  return async context => {
    const { logId, matching, matchingId, to } = context.result;

    if (!matching) {
      console.error(
        'matching not found, unable to send push notification to user.'
      );
      return context;
    }

    const config = context.app.get('oneSignal')[to];
    const { name, oneSignalIds } = matching[to];
    const m_username = name;

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

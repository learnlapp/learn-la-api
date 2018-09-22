const { sendNotification } = require('../../../../modules/oneSignal');
const messageList = require('../../../../modules/notification-messages');

module.exports = function notifyuser() {
  return async context => {
    const { ownerType, ownerId } = context.result;
    const config = context.app.get('oneSignal')[ownerType];
    const { oneSignalIds } = await context.app
      .service(`${ownerType}s`)
      .get(ownerId);

    const { headings, contents, data } = messageList[ownerType].achievement;
    sendNotification({
      config,
      targetIds: oneSignalIds,
      headings: JSON.parse(eval(headings)),
      contents: JSON.parse(eval(contents)),
      data: { ...data },
    });

    return context;
  };
};

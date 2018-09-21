module.exports = function notifyuser() {
  return async context => {
    const { ownerType, ownerId } = context.result;
    const { name, oneSignalIds } = await context.app
      .service(`${ownerType}s`)
      .get(ownerId);

    const { sendNotification, messageList } = context.app.get(
      'oneSignalClient'
    );
    const { headings, contents, data } = messageList[ownerType].achievement;
    console.log('achievement', messageList[ownerType]);

    const str1 = eval(headings);
    const str2 = eval(contents);
    // console.log(str1);
    // console.log(str2);

    // console.log('headings', JSON.parse(str1));
    // console.log('headings', JSON.parse(str2));
    console.log('======= data', data);

    //  console.log('headings', JSON.parse(eval(headings)));
    // console.log('contents', JSON.parse(eval(contents)));

    const res = await sendNotification({
      platform: ownerType,
      targetIds: oneSignalIds,
      headings: JSON.parse(eval(headings)),
      contents: JSON.parse(eval(contents)),
      data: { ...data },
    });

    console.log('res', res);

    return context;
  };
};

const { BadRequest } = require('@feathersjs/errors');

module.exports = function verifyPhone(app) {
  app.post('/notification', async (req, res) => {
    const { sendToStudent, sendToTeacher, messageList } = app.get(
      'oneSignalClient'
    );
    // const oneSignalClient = app.get('oneSignalClient');
    // const { sendToStudent, sendToTeacher, messageList } = oneSignalClient;
    // console.log('oneSignalClient', oneSignalClient);

    const targetIds = ['28bb5a8a-ee7a-4675-bf19-0571b18e5754'];
    const message = messageList.teacher.verification.approved;
    const data = {};
    console.log('message.contents', message.contents);
    const name = 'Thomas';
    const str = eval(message.contents);
    // str = JSON.parse();
    console.log('typeof', typeof str);
    console.log('str', str);
    const abc = JSON.parse(str);
    console.log('str', abc);

    // console.log('message', message);
    try {
      const OS_res = await sendToTeacher({
        name: 'Thomas',
        targetIds,
        headings: JSON.parse(eval(message.headings)),
        contents: JSON.parse(str),
        // data,
      });
      console.log('oneSignal response ', OS_res);

      // res.send(OS_res);
      res.send({ data: 1 });
    } catch (err) {
      console.log(err);
      return res.send(err);
      // res.send(new BadRequest(err.message, err));
    }
  });
};

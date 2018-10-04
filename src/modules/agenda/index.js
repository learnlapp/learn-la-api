const Agenda = require('agenda');

module.exports = async function(app) {
  try {
    const agenda = new Agenda({
      db: {
        address: app.get('mongodb'),
        collection: 'agenda-jobs',
        options: { useNewUrlParser: true },
        processEvery: '1 hour',
      },
    });

    agenda.define('sendMatchingLog', job => {
      console.log('sending resultInquiryMsg');

      app.service('matching-logs').create(job.attrs.data);
    });

    await agenda.start();
    app.set('agenda', agenda);
  } catch (err) {
    console.log('agenda connection error: ', err);
  }
};

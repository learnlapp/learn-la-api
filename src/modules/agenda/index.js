const Agenda = require('agenda');

const mongoConnectionString = process.env.MONGO_URL;
// const mongoConnectionString = 'mongodb://localhost:27017/learn_la';

const agenda = new Agenda({
  db: {
    address: mongoConnectionString,
    collection: 'agenda-jobs',
    options: { useNewUrlParser: true },
    processEvery: '1 day',
  },
});

module.exports = agenda;

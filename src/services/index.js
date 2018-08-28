const users = require('./users/users.service.js');
const students = require('./students/students.service.js');
const teachers = require('./teachers/teachers.service.js');
const courseAds = require('./course-ads/course-ads.service.js');
const oneTimeTokens = require('./one-time-tokens/one-time-tokens.service.js');
const versions = require('./versions/versions.service.js');
const studentAds = require('./student-ads/student-ads.service.js');
const matchings = require('./matchings/matchings.service.js');
const matchingLogs = require('./matching-logs/matching-logs.service.js');
const tickets = require('./tickets/tickets.service.js');
const coinTransactions = require('./coin-transactions/coin-transactions.service.js');
const appSettings = require('./app-settings/app-settings.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function(app) {
  app.configure(users);
  app.configure(students);
  app.configure(teachers);
  app.configure(courseAds);
  app.configure(oneTimeTokens);
  app.configure(versions);
  app.configure(studentAds);
  app.configure(matchings);
  app.configure(matchingLogs);
  app.configure(tickets);
  app.configure(coinTransactions);
  app.configure(appSettings);
};

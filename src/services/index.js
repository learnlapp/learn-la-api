const students = require('./students/students.service.js');
const teachers = require('./teachers/teachers.service.js');
const courseAds = require('./course-ads/course-ads.service.js');
const oneTimeTokens = require('./one-time-tokens/one-time-tokens.service.js');
const studentAds = require('./student-ads/student-ads.service.js');
const matchings = require('./matchings/matchings.service.js');
const matchingLogs = require('./matching-logs/matching-logs.service.js');
const tickets = require('./tickets/tickets.service.js');
const settings = require('./settings/settings.service.js');
const admins = require('./admins/admins.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(students);
  app.configure(teachers);
  app.configure(courseAds);
  app.configure(oneTimeTokens);
  app.configure(studentAds);
  app.configure(matchings);
  app.configure(matchingLogs);
  app.configure(tickets);
  app.configure(settings);
  app.configure(admins);
};

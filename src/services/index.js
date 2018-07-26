const users = require('./users/users.service.js');
const students = require('./students/students.service.js');
const teachers = require('./teachers/teachers.service.js');
const courseAds = require('./course-ads/course-ads.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(users);
  app.configure(students);
  app.configure(teachers);
  app.configure(courseAds);
};

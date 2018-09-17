const courseApproval = require('./course-approval');
const giveCoinsForTeacherProfileCompletion = require('./give-coins-for-teacher-profile-completion');
const initTeacherDefaultValues = require('./init-teacher-default-values');
const requestSMSVerifyCode = require('./request-sms-verify-code');
const verificationApproval = require('./verification-approval');

module.exports = {
  courseApproval,
  giveCoinsForTeacherProfileCompletion,
  initTeacherDefaultValues,
  requestSMSVerifyCode,
  verificationApproval,
};

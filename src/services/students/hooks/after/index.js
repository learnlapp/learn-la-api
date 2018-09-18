const createAchievementForPhoneAssociated = require('./create-achievement-for-phone-associated');
const giveCoinsForStudentProfileCompletion = require('./give-coins-for-student-profile-completion');
const initStudentDefaultValues = require('./init-student-default-values');
const requestSMSVerifyCode = require('./request-sms-verify-code');
const verificationApproval = require('./verification-approval');

module.exports = {
  createAchievementForPhoneAssociated,
  giveCoinsForStudentProfileCompletion,
  initStudentDefaultValues,
  requestSMSVerifyCode,
  verificationApproval,
};

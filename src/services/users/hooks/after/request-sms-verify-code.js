const { promisify } = require('util');
const authy = require('authy');
// https://www.twilio.com/docs/verify/developer-best-practices#explore-the-customization-options

module.exports = function requestSMSVerifyCode() {
  return async context => {
    const { apiKey } = context.app.get('twillio');
    const requestVerifyCode = promisify(
      authy(apiKey).phones().verification_start,
    );

    const { phoneNumber, countryCode } = context.params.query;
    const response = await requestVerifyCode(phoneNumber, countryCode, {
      via: 'sms',
      locale: 'zh-hk',
      code_length: 4,
    });

    return context;
  };
};

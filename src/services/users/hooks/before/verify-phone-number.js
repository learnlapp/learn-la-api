const authy = require('authy');
const { promisify } = require('util');
const { BadRequest } = require('@feathersjs/errors');

module.exports = function verifyPhoneNumber() {
  return async context => {
    const { phone, countryCode, verifyCode } = context.data;
    const { apiKey } = context.app.get('twillio');
    const verify = promisify(authy(apiKey).phones().verification_check);

    try {
      const response = await verify(phone, countryCode, verifyCode);
      console.log('Verify phone number: ', response);
      return context;
    } catch (err) {
      throw new BadRequest(err.message, err);
    }
  };
};

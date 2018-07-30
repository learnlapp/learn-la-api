const authy = require('authy');
const { promisify } = require('util');
const { BadRequest } = require('@feathersjs/errors');

module.exports = function(app) {
  app.post('/verify-phone', async (req, res) => {
    const { phoneNumber, countryCode, verifyCode } = req.body;
    const { apiKey } = app.get('twillio');
    const verify = promisify(authy(apiKey).phones().verification_check);

    try {
      const response = await verify(phoneNumber, countryCode, verifyCode);
      // NOTE: response = {
      //   message: 'Verification code is correct.',
      //   success: true
      // };
      const phone = countryCode.trim() + phoneNumber.trim();
      const existingTokenRecord = await app.service('one-time-tokens').find({
        query: { phone },
        paginate: false
      });

      // Token already exist, return current token
      if (existingTokenRecord.length) {
        response.token = existingTokenRecord[0].token;
        res.send(response);
      }

      // Generate new token
      const { token } = await app.service('one-time-token').create({ phone });
      response.token = token;
      res.send(response);
    } catch (err) {
      res.send(new BadRequest(err.message, err));
    }
  });
};

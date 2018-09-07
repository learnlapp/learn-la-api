const authy = require('authy');
const RandomString = require('randomstring');
const { promisify } = require('util');
const { BadRequest } = require('@feathersjs/errors');

module.exports = function verifyPhone(app) {
  app.post('/verify-phone', async (req, res) => {
    const { phoneNumber, countryCode, verifyCode } = req.body;
    const twillioClient = app.get('twillioClient');
    const verify = promisify(twillioClient.phones().verification_check);

    try {
      const twillioResponse = await verify(
        phoneNumber,
        countryCode,
        verifyCode
      );
      // NOTE: response = {
      //   message: 'Verification code is correct.',
      //   success: true
      // };

      const token = RandomString.generate({
        length: 10,
        charset: 'alphabetic',
      });
      const phone = countryCode.trim() + phoneNumber.trim();
      const oneTimeTokens = await app.service('one-time-tokens').patch(
        null,
        { phone, token },
        {
          query: { phone },
          mongoose: { upsert: true },
        }
      );

      res.send({ ...twillioResponse, phone, token });
    } catch (err) {
      res.send(new BadRequest(err.message, err));
    }
  });
};

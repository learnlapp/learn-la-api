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
      res.send(response);
    } catch (err) {
      res.send(new BadRequest(err.message, err));
    }
  });
};

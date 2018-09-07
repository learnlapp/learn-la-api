const bcrypt = require('bcryptjs');
const { BadRequest } = require('@feathersjs/errors');

module.exports = function verifyOneTimeToken() {
  return async context => {
    if (!parseInt(process.env.DISABLE_TOKEN_VERIFICATION)) {
      const { phone, token } = context.data;
      console.log('ctx.data', ctx.data);

      if (!phone || !token) {
        throw new BadRequest('phone and token are required.');
      }

      const { data } = await context.app
        .service('one-time-tokens')
        .find({ query: { phone } });

      if (!data.length) {
        throw new BadRequest('token is not exist or expired.');
      }

      const hash = data[0].token;
      const isVerified = await bcrypt.compare(token, hash);

      if (!isVerified) {
        throw new BadRequest('token not match.');
      }

      context.app.service('one-time-tokens').remove(data[0]._id);
    }
    return context;
  };
};

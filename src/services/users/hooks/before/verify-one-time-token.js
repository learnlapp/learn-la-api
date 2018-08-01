const bcrypt = require('bcryptjs');
const { BadRequest } = require('@feathersjs/errors');

module.exports = function verifyOneTimeToken() {
  return async context => {
    const { tokenId, token } = context.data;
    console.log('verifying');
    if (!tokenId || !token) {
      throw new BadRequest('tokenId and token are required.');
    }

    const oneTimeToken = await context.app
      .service('one-time-tokens')
      .get(tokenId);

    if (!oneTimeToken) {
      throw new BadRequest('token is not exist or expired.');
    }

    const hash = oneTimeToken.token;
    const isVerified = await bcrypt.compare(token, hash);

    if (!isVerified) {
      throw new BadRequest('token invalid.');
    }

    context.app.service('one-time-tokens').remove(tokenId);
    return context;
  };
};

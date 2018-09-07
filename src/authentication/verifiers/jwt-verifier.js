const { Verifier } = require('@feathersjs/authentication-jwt');
const { GeneralError, NotFound } = require('@feathersjs/errors');

class JwtVerifier extends Verifier {
  // The verify function has the exact same inputs and
  // return values as a vanilla passport strategy
  async verify(req, payload, done) {
    const app = this.app;
    const { platform } = payload;
    const id = payload[`${platform}Id`];

    try {
      if (!platform) {
        throw new GeneralError(`Missing 'platform' in payload.`);
      }

      const user = await app.service(`${platform}s`).get(id);

      if (!user) {
        throw new NotFound();
      }

      // payload = { [`${platform}Id`]: user._id, platform };
      done(null, user, payload);
    } catch (err) {
      done(err);
    }
  }
}

module.exports = JwtVerifier;

const { BadRequest, NotFound } = require('@feathersjs/errors');
const { Verifier } = require('@feathersjs/authentication-local');

class LocalVerifier extends Verifier {
  async verify(req, username, password, done) {
    try {
      const { phone, password, platform } = req.body;

      if (
        platform !== 'student' &&
        platform !== 'teacher' &&
        platform !== 'admin'
      ) {
        throw new BadRequest('Invalid platform.');
      }

      const app = this.app;
      const users = await app
        .service(`${platform}s`)
        .find({ query: { phone }, paginate: false });

      if (!users.length) {
        throw new NotFound('Account not found.');
      }

      const user = await this._comparePassword(users[0], password);
      const payload = { [`${platform}Id`]: user._id, platform };

      done(null, user, payload);
    } catch (err) {
      err ? done(err) : done(null, err, { message: 'Invalid login' });
    }
  }
}

module.exports = LocalVerifier;

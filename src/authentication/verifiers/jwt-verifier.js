const { Verifier } = require('@feathersjs/authentication-jwt');

class CustomVerifier extends Verifier {
  // The verify function has the exact same inputs and
  // return values as a vanilla passport strategy
  async verify(req, payload, done) {
    const app = this.app;
    // do your custom stuff. You can call internal Verifier methods
    // and reference this.app and this.options. This method must be implemented.
    const user = await app.service('users').get(payload.userId);
    const profile = await app.service('teachers').get(user.teacherId);
    console.log('*************');

    // the 'user' variable can be any truthy value
    // the 'payload' is the payload for the JWT access token that is generated after successful authentication
    done(null, user, payload);
  }
}

module.exports = CustomVerifier;

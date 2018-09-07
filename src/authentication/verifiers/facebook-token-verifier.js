const { Verifier } = require('@feathersjs/authentication-oauth2');

class FacebookTokenVerifier extends Verifier {
  async verify(req, accessToken, refreshToken, profile, done) {
    const app = this.app;
    const { platform } = req.body;

    // const options = this.options;
    // let existing;
    // if (this.service.id === null || this.service.id === undefined) {
    //   // debug('failed: the service.id was not set');
    //   return done(
    //     new Error(
    //       'the `id` property must be set on the entity service for authentication'
    //     )
    //   );
    // }

    // // Check request object for an existing entity
    // if (req && req[options.entity]) {
    //   existing = req[options.entity];
    // }

    // // Check the request that came from a hook for an existing entity
    // if (!existing && req && req.params && req.params[options.entity]) {
    //   existing = req.params[options.entity];
    // }

    // // If there is already an entity on the request object (ie. they are
    // // already authenticated) attach the profile to the existing entity
    // // because they are likely "linking" social accounts/profiles.
    // if (existing) {
    //   // NOTE: maybe can merge local and facebook account here
    //   return done(null, existin);
    // }

    try {
      // find existing account
      const users = await app.service(`${platform}s`).find({
        query: {
          facebookId: profile.id,
        },
        paginate: false,
      });

      let user = {};
      if (!users.length) {
        user = await app
          .service(`${platform}s`)
          .create({ profile }, { action: 'facebook-sign-up' });
      } else {
        user = users[0];
      }

      const payload = { [`${platform}Id`]: user._id, platform };
      done(null, user, payload);
    } catch (err) {
      done(err);
    }
  }
}

module.exports = FacebookTokenVerifier;

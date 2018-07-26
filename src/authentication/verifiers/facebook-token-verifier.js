const { Verifier } = require('@feathersjs/authentication-oauth2');

class CustomVerifier extends Verifier {
  async verify(req, accessToken, refreshToken, profile, done) {
    const app = this.app;
    const options = this.options;

    const query = {
      [options.idField]: profile.id, // facebookId: profile.id
      // $limit: 1,
    };

    let existing;

    if (this.service.id === null || this.service.id === undefined) {
      // debug('failed: the service.id was not set');
      return done(
        new Error(
          'the `id` property must be set on the entity service for authentication',
        ),
      );
    }

    // Check request object for an existing entity
    if (req && req[options.entity]) {
      existing = req[options.entity];
      console.log('existing', existing);
    }

    // Check the request that came from a hook for an existing entity
    if (!existing && req && req.params && req.params[options.entity]) {
      existing = req.params[options.entity];
    }

    // If there is already an entity on the request object (ie. they are
    // already authenticated) attach the profile to the existing entity
    // because they are likely "linking" social accounts/profiles.
    if (existing) {
      // NOTE: maybe can merge local and facebook account here
      return done(null, existin);
      // const user = await app.service(options.service).get(existing);
      // return done(null, user);
      // return this._updateEntity(existing, data)
      //   .then(entity => done(null, entity))
      //   .catch(error => (error ? done(error) : done(null, error)));
    }

    try {
      // find existing account
      const { data } = await app.service(options.service).find({ query });
      if (data.length > 0) {
        const payload = { [`${this.options.entity}Id`]: data[0]._id };
        return done(null, data[0], payload);
      }
      // Create new account
      const newUser = await app
        .service(options.service)
        .create({ profile }, { platform: req.body.platform });
      const user = await app.service(options.service).get(newUser._id);
      const payload = { [`${this.options.entity}Id`]: user._id };
      return done(null, user, payload);
    } catch (err) {
      return done(err);
    }
  }
}

module.exports = CustomVerifier;

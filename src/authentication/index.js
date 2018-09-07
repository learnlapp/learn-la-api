const authentication = require('@feathersjs/authentication');
const { protect } = require('@feathersjs/authentication-local').hooks;

const jwt = require('@feathersjs/authentication-jwt');
const local = require('@feathersjs/authentication-local');
const oauth2 = require('@feathersjs/authentication-oauth2');
const FacebookTokenStrategy = require('passport-facebook-token');

const LocalVerifier = require('./verifiers/local-verifier');
const JwtVerifier = require('./verifiers/jwt-verifier');
const FacebookTokenVerifier = require('./verifiers/facebook-token-verifier');

module.exports = function(app) {
  const config = app.get('authentication');

  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt({ Verifier: JwtVerifier }));
  app.configure(local({ Verifier: LocalVerifier }));
  app.configure(
    oauth2(
      Object.assign(
        {
          name: 'facebookTokenStudent',
          Strategy: FacebookTokenStrategy,
          Verifier: FacebookTokenVerifier,
        },
        config.facebookTokenStudent
      )
    )
  );
  app.configure(
    oauth2(
      Object.assign(
        {
          name: 'facebookTokenTeacher',
          Strategy: FacebookTokenStrategy,
          Verifier: FacebookTokenVerifier,
        },
        config.facebookTokenTeacher
      )
    )
  );

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [authentication.hooks.authenticate(config.strategies)],
      remove: [authentication.hooks.authenticate('jwt')],
    },
    after: {
      create: [
        ctx => {
          ctx.result.user = ctx.params.user;
        },
        protect('user.password'),
      ],
    },
  });
};

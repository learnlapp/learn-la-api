const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;
const {
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  iff,
  iffElse,
  isNot,
  isProvider,
  keep,
  paramsFromClient,
  preventChanges,
} = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { isAction, isPlatform } = require('../../hooks');
const {
  constructPhone,
  isNewUser,
  verifyOneTimeToken,
} = require('./hooks/before');

// const { requestSMSVerifyCode } = require('./hooks/after');

module.exports = {
  before: {
    all: [paramsFromClient('action')],
    find: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        iff(isNot(isPlatform('admin')), disallow()),
      ]),
    ],
    get: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        iff(isNot(isPlatform('admin')), disallow()),
      ]),
    ],
    create: [
      disableMultiItemCreate(),
      // iffElse(
      //   isAction('facebook-sign-up'),
      //   [processDataFromFacebook()],
      //   [constructPhone(), isNewUser(), verifyOneTimeToken(), hashPassword()]
      // ),
      constructPhone(),
      isNewUser(),
      // verifyOneTimeToken(),
      hashPassword(),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        iffElse(
          isAction('reset-password'),
          [
            constructPhone(),
            verifyOneTimeToken(),
            preventChanges(false, 'phone', 'phoneNumber', 'countryCode'),
          ],
          [
            authenticate('jwt'),
            iff(isNot(isPlatform('admin')), disallow()),
            restrictToOwner({ idField: '_id', ownerField: 'adminId' }),
            iffElse(
              isAction('update-phone'),
              [constructPhone(), verifyOneTimeToken()],
              [preventChanges(false, 'phone', 'phoneNumber', 'countryCode')]
            ),
          ]
        ),
      ]),
      hashPassword(),
    ],
    remove: [disableMultiItemChange(), authenticate('jwt')],
  },

  after: {
    all: [protect('password')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [iff(isAction('reset-password'), keep('_id'))],
    remove: [],
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: [],
  },
};

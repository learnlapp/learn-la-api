const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;
const {
  // actOnDispatch,
  // alterItems,
  discard,
  disableMultiItemChange,
  disableMultiItemCreate,
  disablePagination,
  disallow,
  iff,
  iffElse,
  isProvider,
  keep,
  paramsFromClient,
  preventChanges,
  skipRemainingHooks,
} = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

// Common hooks
const isAction = require('../../hooks/is-action');
const noRecordFound = require('../../hooks/no-record-found');

// users: Before hooks
// const verifyPhoneNumber = require('./hooks/before/verify-phone-number');
const isNewUser = require('./hooks/before/is-new-user');
const constructPhone = require('./hooks/before/construct-phone');
const isValidPlatform = require('./hooks/before/is-valid-platform');
const isFacebookSignUp = require('./hooks/before/is-facebook-sign-up');
const processDataFromFacebook = require('./hooks/before/process-data-from-facebook');

// users: After hooks
const requestSMSVerifyCode = require('./hooks/after/request-sms-verify-code');
// const signIn = require('./hooks/after/sign-in');
const generateProfile = require('./hooks/after/generate-profile');

module.exports = {
  before: {
    all: [paramsFromClient('action', 'platform')],
    find: [skipRemainingHooks(isAction('phone-sign-up')), authenticate('jwt')],
    get: [iff(isProvider('external'), authenticate('jwt'))],
    create: [
      isValidPlatform(),
      disableMultiItemCreate(),
      iffElse(
        isFacebookSignUp(),
        [processDataFromFacebook()],
        [constructPhone(), isNewUser(), hashPassword()],
      ),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        restrictToOwner({ idField: '_id', ownerField: '_id' }),
        preventChanges(false, 'phone', 'phoneNumber', 'countryCode'),
      ]),
      hashPassword(),
    ],
    remove: [disableMultiItemChange(), authenticate('jwt')],
  },

  after: {
    all: [protect('password')],
    find: [
      iff(isAction('phone-sign-up'), [
        iffElse(noRecordFound(), requestSMSVerifyCode(), keep('createdAt')),
      ]),
    ],
    get: [],
    create: [
      generateProfile(),
      // ctx => console.log('============> user result', ctx.result),
      // ctx => console.log('============> user result', ctx.dispatch),
    ],
    update: [],
    patch: [],
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

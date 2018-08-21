const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  discard,
  disableMultiItemChange,
  disablePagination,
  fastJoin,
  iff,
  iffElse,
  isProvider,
  keep,
  paramsFromClient,
  preventChanges,
  serialize,
  skipRemainingHooks,
} = require('feathers-hooks-common');
// const {
//   restrictToOwner,
//   associateCurrentUser,
// } = require('feathers-authentication-hooks');

// const isAction = require('../../hooks/is-action');
const setFastJoinQuery = require('../../hooks/set-fastJoin-query');

const setExpiredAfter = require('../../hooks/set-expired-after');
const isOwner = require('./hooks/before/is-owner');
const exchangePhoneCheck = require('./hooks/before/exchange-phone-check');

const associateUsers = require('./hooks/before/associate-users');

const initLogMsg = require('./hooks/after/init-log-msgs');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), authenticate('jwt')),
      paramsFromClient('action'),
    ],
    find: [],
    get: [],
    create: [associateUsers(), setExpiredAfter(4, 'hour')],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [isOwner(), exchangePhoneCheck()]),
    ],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers, setFastJoinQuery())],
    get: [fastJoin(resolvers, setFastJoinQuery())],
    create: [initLogMsg(), fastJoin(resolvers), setFastJoinQuery()],
    update: [],
    patch: [fastJoin(resolvers, setFastJoinQuery())],
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

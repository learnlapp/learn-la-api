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

const isAction = require('../../hooks/is-action');

const setExpiredAfter = require('../../hooks/set-expired-after');
const isOwner = require('./hooks/before/is-owner');

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
    patch: [disableMultiItemChange(), isOwner()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers)],
    get: [fastJoin(resolvers)],
    create: [initLogMsg(), fastJoin(resolvers)],
    update: [],
    patch: [iff(isProvider('external'), fastJoin(resolvers))],
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

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

const setExpiredAfter = require('../../hooks/set-expired-after');

const associateUsers = require('./hooks/before/associate-users');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [associateUsers(), setExpiredAfter(new Date(), 4, 'hour')],
    update: [disallow()],
    patch: [disableMultiItemChange()],
    remove: [disallow()],
  },

  after: {
    all: [fastJoin(resolvers)],
    find: [],
    get: [],
    create: [],
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

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

const initLogMsg = require('./hooks/after/init-log-msgs');

const resolvers = require('./resolvers');
const schema = require('./schema');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [associateUsers(), setExpiredAfter(4, 'hour')],
    update: [disallow()],
    patch: [disableMultiItemChange()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers), serialize(schema)],
    get: [fastJoin(resolvers), serialize(schema)],
    create: [initLogMsg(), fastJoin(resolvers), serialize(schema)],
    update: [],
    patch: [fastJoin(resolvers), serialize(schema)],
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

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

const saveLatestLogTime = require('./hooks/after/save-latest-log-time');

module.exports = {
  before: {
    all: [iff(isProvider('external'), authenticate('jwt'))],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [iff(isProvider('external'), disableMultiItemChange())],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [saveLatestLogTime()],
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

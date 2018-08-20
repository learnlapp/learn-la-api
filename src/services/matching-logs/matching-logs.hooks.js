const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  discard,
  disableMultiItemChange,
  disablePagination,
  fastJoin,
  iff,
  iffElse,
  isNot,
  isProvider,
  keep,
  paramsFromClient,
  preventChanges,
  serialize,
  skipRemainingHooks,
} = require('feathers-hooks-common');

const isAction = require('../../hooks/is-action');

const saveLatestLogTime = require('./hooks/after/save-latest-log-time');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), authenticate('jwt')),
      paramsFromClient('action'),
    ],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [
      iff(isProvider('external'), [
        iff(isNot(isAction('read')), disableMultiItemChange()),
      ]),
    ],
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

const {
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  discard,
  iff,
  isProvider,
  keep,
  skipRemainingHooks,
} = require('feathers-hooks-common');

const hashToken = require('./hooks/before/hash-token');

module.exports = {
  before: {
    all: [iff(isProvider('external'), disallow())],
    find: [],
    get: [],
    create: [hashToken()],
    update: [disallow()],
    patch: [hashToken()],
    remove: [disableMultiItemChange()],
  },

  after: {
    all: [discard('token')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [keep('phone', 'updatedAt')],
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

const {
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  discard,
  iff,
  isProvider,
  keep,
} = require('feathers-hooks-common');

const hashToken = require('./hooks/before/hash-token');

module.exports = {
  before: {
    all: [iff(isProvider('external'), disallow())],
    find: [],
    get: [],
    create: [disableMultiItemCreate(), hashToken()],
    update: [disallow()],
    patch: [hashToken()],
    remove: [disableMultiItemChange()],
  },

  after: {
    all: [iff(isProvider('external'), discard('token'))],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [keep('_id', 'phone', 'updatedAt')],
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

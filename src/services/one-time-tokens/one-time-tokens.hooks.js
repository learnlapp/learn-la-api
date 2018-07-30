const {
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  iff,
  isProvider,
  keep,
  skipRemainingHooks
} = require("feathers-hooks-common");

const genToken = require("./hooks/before/gen-token");
const hashToken = require("./hooks/before/hash-token");

module.exports = {
  before: {
    all: [iff(isProvider("external"), disallow())],
    find: [],
    get: [],
    create: [disableMultiItemCreate(), genToken(), hashToken()],
    update: [disallow()],
    patch: [disableMultiItemChange()],
    remove: [disableMultiItemChange()]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};

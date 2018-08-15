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
  skipRemainingHooks,
} = require('feathers-hooks-common');
const {
  restrictToOwner,
  associateCurrentUser,
} = require('feathers-authentication-hooks');

// Before hooks
const extractAndUpdateUserInfo = require('./hooks/before/extract-and-update-user-info');

// After hooks
const saveStudentToUser = require('./hooks/after/save-student-to-user');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [iff(isProvider('external'), [authenticate('jwt')])],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [disableMultiItemChange(), extractAndUpdateUserInfo()],
    remove: [disableMultiItemChange()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers)],
    get: [fastJoin(resolvers)],
    create: [saveStudentToUser(), fastJoin(resolvers)],
    update: [],
    patch: [fastJoin(resolvers)],
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

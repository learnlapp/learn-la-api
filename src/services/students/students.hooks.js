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

const setFastJoinQuery = require('../../hooks/set-fastJoin-query');

// Before hooks
const extractAndUpdateUserInfo = require('./hooks/before/extract-and-update-user-info');
const initStudentQuota = require('./hooks/before/init-student-quota');

// After hooks
const saveStudentToUser = require('./hooks/after/save-student-to-user');
const giveStudentWelcomeCoins = require('./hooks/after/give-student-welcome-coins');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [iff(isProvider('external'), [authenticate('jwt')])],
    find: [],
    get: [],
    create: [initStudentQuota()],
    update: [disallow()],
    patch: [disableMultiItemChange(), extractAndUpdateUserInfo()],
    remove: [disableMultiItemChange()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers, setFastJoinQuery())],
    get: [fastJoin(resolvers, setFastJoinQuery())],
    create: [
      giveStudentWelcomeCoins(),
      saveStudentToUser(),
      fastJoin(resolvers, setFastJoinQuery()),
    ],
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

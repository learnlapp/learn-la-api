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
// After hooks
const saveTeacherToUser = require('./hooks/after/save-teacher-to-user');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [iff(isProvider('external'), [authenticate('jwt')])],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [disableMultiItemChange(), extractAndUpdateUserInfo()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers, setFastJoinQuery())],
    get: [fastJoin(resolvers, setFastJoinQuery())],
    create: [saveTeacherToUser(), fastJoin(resolvers, setFastJoinQuery())],
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

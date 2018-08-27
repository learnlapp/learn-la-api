const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  disableMultiItemChange,
  fastJoin,
  iff,
} = require('feathers-hooks-common');

const {
  // restrictToOwner,
  associateCurrentUser,
} = require('feathers-authentication-hooks');

const setFastJoinQuery = require('../../hooks/set-fastJoin-query');

const isPlatform = require('../../hooks/is-platform');

const setTicketPlatform = require('./hooks/before/set-ticket-platform');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [
      iff(isPlatform('student'), [
        associateCurrentUser({ idField: 'studentId', as: 'studentId' }),
        setTicketPlatform('student'),
      ]),
      iff(isPlatform('teacher'), [
        associateCurrentUser({ idField: 'studentId', as: 'teacherId' }),
        setTicketPlatform('teacher'),
      ]),
    ],
    update: [disallow()],
    patch: [disableMultiItemChange()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
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

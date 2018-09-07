const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  disableMultiItemChange,
  disableMultiItemCreate,
  fastJoin,
  iff,
  isNot,
  isProvider,
} = require('feathers-hooks-common');

const {
  restrictToOwner,
  associateCurrentUser,
} = require('feathers-authentication-hooks');

const { isPlatform, setFastJoinQuery } = require('../../hooks');

const { setTicketPlatform } = require('./hooks/before');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [iff(isProvider('external'), [authenticate('jwt')])],
    find: [],
    get: [],
    create: [
      disableMultiItemCreate(),
      iff(isPlatform('student'), [
        associateCurrentUser({ idField: '_id', as: 'studentId' }),
        setTicketPlatform('student'),
      ]),
      iff(isPlatform('teacher'), [
        associateCurrentUser({ idField: '_id', as: 'teacherId' }),
        setTicketPlatform('teacher'),
      ]),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isPlatform('student'), [
        restrictToOwner({ idField: '_id', ownerField: 'studentId' }),
      ]),
      iff(isPlatform('teacher'), [
        restrictToOwner({ idField: '_id', ownerField: 'teacherId' }),
      ]),
      iff(isNot(isPlatform('admin')), disallow()),
    ],
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

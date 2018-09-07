const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  // discard,
  disableMultiItemChange,
  disableMultiItemCreate,
  fastJoin,
  iff,
  iffElse,
  isProvider,
  paramsFromClient,
  // preventChanges,
  // serialize,
} = require('feathers-hooks-common');
const {
  restrictToOwner,
  associateCurrentUser,
} = require('feathers-authentication-hooks');

const {
  // isAuthenticated,
  isPlatform,
  refreshParamsEntity,
  setFastJoinQuery,
} = require('../../hooks');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        paramsFromClient('action'),
      ]),
    ],
    find: [],
    get: [
      iff(isProvider('external'), [
        iffElse(
          isPlatform('student'),
          [restrictToOwner({ idField: '_id', ownerField: 'studentId' })],
          [disallow()]
        ),
      ]),
    ],
    create: [
      disableMultiItemCreate(),
      iff(isProvider('external'), [
        iffElse(
          isPlatform('student'),
          [associateCurrentUser({ idField: '_id', as: 'studentId' })],
          [disallow()]
        ),
      ]),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        iffElse(
          isPlatform('student'),
          [restrictToOwner({ idField: '_id', ownerField: 'studentId' })],
          [disallow()]
        ),
      ]),
    ],
    remove: [disallow()],
  },

  after: {
    all: [
      iff(isPlatform('teacher'), refreshParamsEntity('teacher')),
      fastJoin(resolvers, setFastJoinQuery()),
    ],
    find: [],
    get: [],
    create: [],
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

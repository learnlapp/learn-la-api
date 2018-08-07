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
  serialize,
  skipRemainingHooks,
} = require('feathers-hooks-common');
const {
  restrictToOwner,
  associateCurrentUser,
} = require('feathers-authentication-hooks');

// const isAuthenticated = require('../../hooks/is-authenticated');

const pushPayloadToUser = require('../../hooks/push-payload-to-user');

const resolvers = require('./resolvers');

const schema = require('./schema');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), [authenticate('jwt'), pushPayloadToUser()]),
      paramsFromClient('action', 'paginate'),
    ],
    find: [],
    get: [
      iff(isProvider('external'), [
        restrictToOwner({ idField: 'studentId', ownerField: 'studentId' }),
      ]),
    ],
    create: [associateCurrentUser({ idField: 'studentId', as: 'studentId' })],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        restrictToOwner({ idField: 'studentId', ownerField: 'studentId' }),
      ]),
    ],
    remove: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        restrictToOwner({ idField: 'studentId', ownerField: 'studentId' }),
      ]),
    ],
  },

  after: {
    all: [fastJoin(resolvers), serialize(schema)],
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

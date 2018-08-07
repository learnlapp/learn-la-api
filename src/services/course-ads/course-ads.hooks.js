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

const isAuthenticated = require('../../hooks/is-authenticated');

const pushPayloadToUser = require('../../hooks/push-payload-to-user');

const resolvers = require('./resolvers');

const schema = require('./schema');

module.exports = {
  before: {
    all: [pushPayloadToUser(), paramsFromClient('action', 'paginate')],
    find: [ctx => console.log('ctx.params.query', ctx.params.query._id)],
    get: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        restrictToOwner({ idField: 'teacherId', ownerField: 'teacherId' }),
      ]),
    ],
    create: [
      authenticate('jwt'),
      associateCurrentUser({ idField: 'teacherId', as: 'teacherId' }),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        restrictToOwner({ idField: 'teacherId', ownerField: 'teacherId' }),
      ]),
    ],
    remove: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        restrictToOwner({ idField: 'teacherId', ownerField: 'teacherId' }),
      ]),
    ],
  },

  after: {
    all: [fastJoin(resolvers), iff(isAuthenticated(), serialize(schema))],
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

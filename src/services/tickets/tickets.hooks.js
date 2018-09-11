const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  disableMultiItemChange,
  disableMultiItemCreate,
  fastJoin,
  iff,
  iffElse,
  isNot,
  isProvider,
  preventChanges,
} = require('feathers-hooks-common');
const { associateCurrentUser } = require('feathers-authentication-hooks');

const {
  _restrictToOwner,
  isPlatform,
  setFastJoinQuery,
} = require('../../hooks');

const { setTicketPlatform } = require('./hooks/before');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [iff(isProvider('external'), [authenticate('jwt')])],
    find: [],
    get: [],
    create: [
      disableMultiItemCreate(),
      iffElse(
        ctx => isPlatform('student')(ctx) || isPlatform('teacher')(ctx),
        [
          associateCurrentUser({ idField: '_id', as: 'ownerId' }),
          setTicketPlatform(),
        ],
        [disallow()]
      ),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iffElse(
        ctx => isPlatform('student')(ctx) || isPlatform('teacher')(ctx),
        [_restrictToOwner({ ownerField: 'ownerId' })],
        [iff(isNot(isPlatform('admin')), [disallow()])]
      ),
      preventChanges(false, 'type', 'platform', 'ownerId'),
    ],
    remove: [disallow()],
  },

  after: {
    all: [iff(isPlatform('admin'), [fastJoin(resolvers, setFastJoinQuery())])],
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

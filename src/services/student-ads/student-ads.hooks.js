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

const isPlatform = require('../../hooks/is-platform');
const setFastJoinQuery = require('../../hooks/set-fastJoin-query');

// const pushPayloadToUser = require('../../hooks/push-payload-to-user');
const isSettingOnline = require('./hooks/before/is-setting-online');
const chargeCoins = require('./hooks/before/charge-coins');

const getLatestTeacherProfile = require('./hooks/after/get-latest-teacher-profile');

const resolvers = require('./resolvers');

const schema = require('./schema');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        // pushPayloadToUser()
      ]),
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
        iff(isSettingOnline(), [chargeCoins()]),
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
    all: [
      fastJoin(resolvers, setFastJoinQuery()),
      iff(isPlatform('teacher'), [
        getLatestTeacherProfile(),
        serialize(schema),
      ]),
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

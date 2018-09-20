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
  isAuthenticated,
  isPlatform,
  isSettingOnline,
  refreshParamsEntity,
  setFastJoinQuery,
} = require('../../hooks');

const { chargeCoinsForSettingOnline } = require('./hooks/before');
const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [paramsFromClient('action')],
    find: [],
    get: [
      // iff(isProvider('external'), [
      //   authenticate('jwt'),
      //   iffElse(
      //     isPlatform('teacher'),
      //     [restrictToOwner({ idField: '_id', ownerField: 'teacherId' })],
      //     [disallow()]
      //   ),
      // ]),
    ],
    create: [
      disableMultiItemCreate(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        iffElse(
          isPlatform('teacher'),
          [
            associateCurrentUser({ idField: '_id', as: 'teacherId' }),
            // iff(isSettingOnline(), [chargeCoinsForSettingOnline()]),
          ],
          [disallow()]
        ),
      ]),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        iffElse(
          isPlatform('teacher'),
          [
            restrictToOwner({ idField: '_id', ownerField: 'teacherId' }),
            iff(isSettingOnline(), [chargeCoinsForSettingOnline()]),
          ],
          [disallow()]
        ),
      ]),
    ],
    remove: [disallow()],
  },

  after: {
    all: [
      iff(isAuthenticated(), [
        iff(isPlatform('student'), refreshParamsEntity('student')),
      ]),
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

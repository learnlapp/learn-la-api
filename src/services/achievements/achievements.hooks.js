const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  iff,
  iffElse,
  isNot,
  isProvider,
  paramsFromClient,
  some,
  preventChanges,
} = require('feathers-hooks-common');
// const { restrictToOwner } = require('feathers-authentication-hooks');

const {
  _queryWithCurrentUser,
  isAction,
  _restrictToOwner,
  isPlatform,
} = require('../../hooks');
const { proceedRedeem } = require('./hooks/before');
const { finishRedeem, giveExtra, notifyUser } = require('./hooks/after');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        paramsFromClient('action'),
      ]),
    ],
    find: [
      iff(isProvider('external'), [
        iffElse(
          some(isPlatform('student'), isPlatform('teacher')),
          [_queryWithCurrentUser()],
          [iff(isNot(isPlatform('admin')), [disallow()])]
        ),
      ]),
    ],
    get: [
      iff(isProvider('external'), [
        iffElse(
          some(isPlatform('student'), isPlatform('teacher')),
          [_restrictToOwner({ ownerField: 'ownerId' })],
          [iff(isNot(isPlatform('admin')), [disallow()])]
        ),
      ]),
    ],
    create: [
      disableMultiItemCreate(),
      iff(isProvider('external'), [disallow()]),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        iffElse(
          some(isPlatform('student'), isPlatform('teacher')),
          [
            iff(isAction('redeem'), proceedRedeem()),
            preventChanges(
              false,
              'category',
              'type',
              'ownerId',
              'ownerType',
              'coin'
            ),
          ],
          [iff(isNot(isPlatform('admin')), [disallow()])]
        ),
      ]),
    ],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [notifyUser(), giveExtra()],
    update: [],
    patch: [iff(isAction('redeemed'), finishRedeem())],
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

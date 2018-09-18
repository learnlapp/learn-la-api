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
const { restrictToOwner } = require('feathers-authentication-hooks');

const { _queryWithCurrentUser, isPlatform } = require('../../hooks');
const { giveExtra } = require('./hooks/after');

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
          [restrictToOwner({ idField: '_id', ownerField: 'ownerId' })],
          [iff(isNot(isPlatform('admin')), [disallow()])]
        ),
      ]),
    ],
    create: [
      disableMultiItemCreate(),
      iff(isProvider('external'), [disallow()]),
    ],
    update: [disallow()],
    patch: [disableMultiItemChange()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [giveExtra()],
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

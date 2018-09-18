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

const { isPlatform } = require('../../hooks');

module.exports = {
  before: {
    all: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        paramsFromClient('action'),
      ]),
    ],
    find: [
      iffElse(isProvider('external'), [
        iff(
          some(isPlatform('student'), isPlatform('teacher')),
          [restrictToOwner({ idField: '_id', ownerField: 'ownerId' })],
          [iff(isNot(isPlatform('admin')), [disallow()])]
        ),
      ]),
    ],
    get: [
      iffElse(isProvider('external'), [
        iff(
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

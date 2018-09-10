const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  iff,
  isProvider,
  isNot,
  preventChanges,
} = require('feathers-hooks-common');

const { isPlatform } = require('../../hooks');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      disableMultiItemCreate(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        iff(isNot(isPlatform('admin')), disallow()),
      ]),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        authenticate('jwt'),
        iff(isNot(isPlatform('admin')), disallow()),
      ]),
      preventChanges(false, 'platform'),
    ],
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

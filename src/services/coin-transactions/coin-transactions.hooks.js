const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  iff,
  isNot,
  isProvider,
  fastJoin,
} = require('feathers-hooks-common');

const { isPlatform } = require('../../hooks');
const { validate } = require('./hooks/before');
const { updateWallet } = require('./hooks/after');

module.exports = {
  before: {
    all: [iff(isProvider('external'), authenticate('jwt'))],
    find: [],
    get: [],
    create: [
      iff(isProvider('external'), [
        iff(isNot(isPlatform('admin')), [disallow()]),
      ]),
      validate(),
    ],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateWallet()],
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

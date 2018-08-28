const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, iff, iffElse, isProvider } = require('feathers-hooks-common');

const isAdmin = require('../../hooks/is-admin');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [authenticate('jwt'), isAdmin()],
    update: [disallow()],
    patch: [authenticate('jwt'), isAdmin()],
    remove: [authenticate('jwt')],
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

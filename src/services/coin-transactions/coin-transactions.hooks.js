const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  iff,
  isProvider,
  fastJoin,
} = require('feathers-hooks-common');

const validate = require('./hooks/before/validate');

const updateProfile = require('./hooks/after/update-profile');

module.exports = {
  before: {
    all: [iff(isProvider('external'), authenticate('jwt'))],
    find: [],
    get: [],
    create: [iff(isProvider('external'), disallow()), validate()],
    update: [disallow()],
    patch: [disallow()],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [updateProfile()],
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

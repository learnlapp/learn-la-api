const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  disableMultiItemChange,
  fastJoin,
  iff,
  isNot,
  isProvider,
  paramsFromClient,
  preventChanges,
} = require('feathers-hooks-common');

const { isAction } = require('../../hooks');

const { saveLatestLogTime } = require('./hooks/after');

module.exports = {
  before: {
    all: [
      paramsFromClient('action'),
      iff(isProvider('external'), authenticate('jwt')),
    ],
    find: [],
    get: [],
    create: [],
    update: [disallow()],
    patch: [
      iff(isProvider('external'), [
        iff(isNot(isAction('read')), disableMultiItemChange()),
      ]),
    ],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [saveLatestLogTime()],
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

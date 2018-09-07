const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  disallow,
  discard,
  disableMultiItemChange,
  disableMultiItemCreate,
  fastJoin,
  iff,
  isProvider,
  paramsFromClient,
  preventChanges,
} = require('feathers-hooks-common');

const { setExpiredAfter, setFastJoinQuery } = require('../../hooks');

const {
  associateRelevantIds,
  isOwner,
  exchangePhoneCheck,
} = require('./hooks/before');

const { initLogMsg } = require('./hooks/after');

const resolvers = require('./resolvers');

module.exports = {
  before: {
    all: [
      paramsFromClient('action'),
      iff(isProvider('external'), authenticate('jwt')),
    ],
    find: [],
    get: [iff(isProvider('external'), isOwner())],
    create: [
      disableMultiItemCreate(),
      associateRelevantIds(),
      setExpiredAfter(4, 'hour'),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        c => console.log(c.data),

        isOwner(),
        exchangePhoneCheck(),
      ]),
    ],
    remove: [disallow()],
  },

  after: {
    all: [],
    find: [fastJoin(resolvers, setFastJoinQuery())],
    get: [fastJoin(resolvers, setFastJoinQuery())],
    create: [initLogMsg(), fastJoin(resolvers, setFastJoinQuery())],
    update: [],
    patch: [fastJoin(resolvers, setFastJoinQuery())],
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

const { authenticate } = require('@feathersjs/authentication').hooks;
const { disallow, iff, isNot, isProvider } = require('feathers-hooks-common');
const { associateCurrentUser } = require('feathers-authentication-hooks');

const { isPlatform } = require('../../hooks');
const { validate } = require('./hooks/before');

module.exports = {
  before: {
    all: [iff(isProvider('external'), authenticate('jwt'))],
    find: [disallow()],
    get: [disallow()],
    create: [
      iff(isPlatform('student'), [
        associateCurrentUser({ idField: '_id', as: 'studentId' }),
      ]),
      iff(isPlatform('teacher'), [
        associateCurrentUser({ idField: '_id', as: 'teacherId' }),
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

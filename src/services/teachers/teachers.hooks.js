const { authenticate } = require('@feathersjs/authentication').hooks;
const {
  hashPassword,
  protect,
} = require('@feathersjs/authentication-local').hooks;
const {
  // discard,
  disableMultiItemChange,
  disableMultiItemCreate,
  disallow,
  every,
  iff,
  iffElse,
  isNot,
  isProvider,
  keep,
  paramsFromClient,
  preventChanges,
  some,
  when,
} = require('feathers-hooks-common');
const { restrictToOwner } = require('feathers-authentication-hooks');

const { isAction, isPlatform } = require('../../hooks');
const {
  constructPhone,
  initTeacherDefaultValues,
  isNewUser,
  processDataFromFacebook,
  verifyOneTimeToken,
} = require('./hooks/before');
const {
  courseApproval,
  giveTeacherWelcomeCoinss,
  requestSMSVerifyCode,
  verificationApproval,
} = require('./hooks/after');

module.exports = {
  before: {
    all: [paramsFromClient('action', 'subdocumentId')],
    find: [
      iff(isProvider('external'), [
        iff(isNot(isAction('phone-sign-up')), [
          authenticate('jwt'),
          when(
            every(isNot(isPlatform('teacher')), isNot(isPlatform('admin'))),
            [disallow()]
          ),
          // iff(ctx => !isPlatform('teacher')(ctx) && !isPlatform('admin')(ctx), [
          //   disallow(),
          // ]),
        ]),
      ]),
    ],
    get: [
      iff(isProvider('external'), [
        authenticate('jwt'),
        iffElse(
          isPlatform('teacher'),
          [restrictToOwner({ idField: '_id', ownerField: '_id' })],
          [iff(isNot(isPlatform('admin')), [disallow()])]
        ),
      ]),
    ],
    create: [
      disableMultiItemCreate(),
      iffElse(
        isAction('facebook-sign-up'),
        [processDataFromFacebook()],
        [constructPhone(), isNewUser(), verifyOneTimeToken(), hashPassword()]
      ),
      initTeacherDefaultValues(),
    ],
    update: [disallow()],
    patch: [
      disableMultiItemChange(),
      iff(isProvider('external'), [
        iffElse(
          isAction('reset-password'),
          [
            constructPhone(),
            verifyOneTimeToken(),
            preventChanges(false, 'phone', 'phoneNumber', 'countryCode'),
          ],
          [
            authenticate('jwt'),
            when(
              some(
                isAction('course-approval'),
                isAction('verification-approval')
              ),
              [iff(isNot(isPlatform('admin')), [disallow()])]
            ),
            // iff(
            //   ctx =>
            //     isAction('course-approval')(ctx) ||
            //     isAction('verification-approval')(ctx),
            //   [iff(isNot(isPlatform('admin')), [disallow()])]
            // ),
            iffElse(
              isPlatform('teacher'),
              [
                restrictToOwner({ idField: '_id', ownerField: '_id' }),
                iffElse(
                  isAction('update-phone'),
                  [constructPhone(), verifyOneTimeToken()],
                  [preventChanges(false, 'phone', 'phoneNumber', 'countryCode')]
                ),
              ],
              [
                iffElse(
                  isNot(isPlatform('admin')),
                  [disallow()],
                  [preventChanges(false, 'phone', 'phoneNumber', 'countryCode')]
                ),
              ]
            ),
          ]
        ),
      ]),
      hashPassword(),
    ],
    remove: [disableMultiItemChange(), authenticate('jwt')],
  },

  after: {
    all: [protect('password')],
    find: [
      iff(isAction('phone-sign-up'), [
        requestSMSVerifyCode(),
        keep('_id', 'createdAt'),
      ]),
    ],
    get: [],
    create: [giveTeacherWelcomeCoinss()],
    update: [],
    patch: [
      iff(isAction('reset-password'), keep('_id')),
      iff(isAction('course-approval'), [courseApproval()]),
      iff(isAction('verification-approval'), [verificationApproval()]),
    ],
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

const { NotFound } = require('@feathersjs/errors');

module.exports = function initTeacherQuota() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const freeApplyQuota = teacherSettings.coin.free.matching;

    await context.app.service('teachers').patch(context.id, {
      freeApplyQuotaLeft: freeApplyQuota,
    });

    context.dispatch = {
      ...context.dispatch,
      freeApplyQuotaLeft: freeApplyQuota,
    };

    return context;
  };
};

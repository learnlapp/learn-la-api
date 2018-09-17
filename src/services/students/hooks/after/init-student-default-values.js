module.exports = function initTeacherQuota() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const freeApplyQuota = studentSettings.coin.free.matching;

    await context.app.service('students').patch(context.id, {
      freeApplyQuotaLeft: freeApplyQuota,
    });

    context.dispatch = {
      ...context.dispatch,
      freeApplyQuotaLeft: freeApplyQuota,
    };

    return context;
  };
};

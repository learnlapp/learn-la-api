const { NotFound } = require('@feathersjs/errors');

module.exports = function initTeacherQuota() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { freeApplyfreeApplyQuota } = studentSettings;

    context.data = {
      ...context.data,
      freeApplyQuotaLeft: freeApplyfreeApplyQuota,
    };
    return context;
  };
};

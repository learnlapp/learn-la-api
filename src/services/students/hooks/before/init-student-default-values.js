const { NotFound } = require('@feathersjs/errors');

module.exports = function initTeacherQuota() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { freeApplyfreeApplyQuotaQuota } = studentSettings;

    context.data = {
      ...context.data,
      freeApplyQuotaLeft: freeApplyfreeApplyQuotaQuota,
    };
    return context;
  };
};

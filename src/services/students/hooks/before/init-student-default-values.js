const { NotFound } = require('@feathersjs/errors');

module.exports = function initTeacherQuota() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { freeApplyQuotaLeft } = studentSettings;

    context.data = { ...context.data, freeApplyQuotaLeft: freeApplyQuota };
    return context;
  };
};

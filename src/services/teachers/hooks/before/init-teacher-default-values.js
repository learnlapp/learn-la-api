const { NotFound } = require('@feathersjs/errors');

module.exports = function initTeacherQuota() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { freeApplyQuota } = teacherSettings;
    console.log('quota', teacherSettings);

    context.data = { ...context.data, freeApplyQuotaLeft: freeApplyQuota };
    return context;
  };
};

const { NotFound } = require('@feathersjs/errors');

module.exports = function initStudentQuota() {
  return async context => {
    const { data } = await context.app
      .service('app-settings')
      .find({ platform: 'student' });

    if (data.length <= 0) {
      throw new NotFound('No app settings found.');
    }

    const {
      freeAdsQuota,
      freeAdsQuotaLeft,
      freeApplyQuota,
      freeApplyQuotaLeft,
    } = data[0];

    context.data = {
      ...context.data,
      freeAdsQuota,
      freeAdsQuotaLeft,
      freeApplyQuota,
      freeApplyQuotaLeft,
    };

    return context;
  };
};

const { BadRequest } = require('@feathersjs/errors');

module.exports = function isNewUser() {
  return async context => {
    const { phone } = context.data;

    if (!phone) {
      throw new BadRequest(`'phone' is required.`);
    }

    const users = await context.service.find({
      query: { phone, $limit: 0 },
    });

    if (users.total) {
      throw new BadRequest('User already exist.');
    }

    return context;
  };
};

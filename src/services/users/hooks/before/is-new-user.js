const { BadRequest } = require('@feathersjs/errors');

module.exports = function isNewUser() {
  return async context => {
    const { phone } = context.data;

    if (!phone) {
      throw new BadRequest('Phone is missing');
    }

    const { data } = await context.service.find({
      query: { phone },
    });

    if (data.length > 0) {
      throw new BadRequest('User already exist');
    }

    return context;
  };
};

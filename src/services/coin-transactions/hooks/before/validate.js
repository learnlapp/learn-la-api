const { BadRequest } = require('@feathersjs/errors');

module.exports = function validate() {
  return async context => {
    const { ref } = context.data;

    if (!ref) {
      throw new BadRequest(`field 'ref' is required.`);
    }

    switch (ref) {
      case 'system':
        return context;

      case 'admin':
        if (!adminId) {
          throw new BadRequest(`'adminId' is required.`);
        }

        const admin = await context.app.service('users').get(adminId);
        if (!admin) {
          throw new BadRequest(`admin not found.`);
        }

        return context;
      default:
        throw new BadRequest(`.`);
    }
    return context;
  };
};

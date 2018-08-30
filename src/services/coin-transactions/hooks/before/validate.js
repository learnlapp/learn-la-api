const { BadRequest } = require('@feathersjs/errors');

module.exports = function validate() {
  return async context => {
    const { handledBy, ref, refId } = context.data;

    if ((ref && !refId) || (!ref && refId)) {
      throw new BadRequest(`Field 'ref' and 'refId' should be exist in pair.`);
    }

    if (!handledBy) {
      throw new BadRequest(`Field 'handledBy' is required.`);
    }

    switch (handledBy) {
      case 'system':
        return context;

      case 'admin':
        if (!adminId) {
          throw new BadRequest(`'adminId' is required.`);
        }

        const admin = await context.app.service('users').get(adminId);
        if (!admin && admin.roles.indexOf('admin') !== -1) {
          throw new BadRequest(`Admin not found.`);
        }

        break;
      default:
        break;
    }
    return context;
  };
};

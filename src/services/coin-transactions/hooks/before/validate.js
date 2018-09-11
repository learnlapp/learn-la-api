const { BadRequest } = require('@feathersjs/errors');

module.exports = function validate() {
  return context => {
    const { handledBy, ref, refId } = context.data;
    const { adminId } = context.params.payload;

    if ((ref && !refId) || (!ref && refId)) {
      throw new BadRequest(`Field 'ref' and 'refId' should be exist in pair.`);
    }

    if (!handledBy) {
      throw new BadRequest(`Field 'handledBy' is required.`);
    }

    switch (handledBy) {
      case 'system':
        break;

      case 'admin':
        if (!adminId) {
          throw new BadRequest(`'adminId' is required.`);
        }
        break;

      default:
        break;
    }

    return context;
  };
};

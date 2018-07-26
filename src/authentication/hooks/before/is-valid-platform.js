const { BadRequest } = require('@feathersjs/errors');

module.exports = function isValidPlatform() {
  return async context => {
    const { platform } = context.data;

    if (
      platform !== 'teacher' &&
      platform !== 'student' &&
      platform !== 'admin'
    ) {
      throw new BadRequest('Invalid platform');
    }

    return context;
  };
};

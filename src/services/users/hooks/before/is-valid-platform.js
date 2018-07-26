const { BadRequest } = require('@feathersjs/errors');

module.exports = function isValidPlatform() {
  return context => {
    const { platform } = context.params;

    if (platform !== 'teacher' && platform !== 'student') {
      throw new BadRequest('Invalid platform specified');
    }

    return context;
  };
};

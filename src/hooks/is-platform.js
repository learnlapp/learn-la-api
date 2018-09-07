const { getByDot } = require('feathers-hooks-common');
const { Forbidden } = require('@feathersjs/errors');

module.exports = function isPlatform(platform) {
  return context => {
    if (getByDot(context.params, 'payload.platform') === platform) {
      return context;
    }
    // if (getByDot(context.params, 'payload.platform') !== platform) {
    //   throw new Forbidden('Permission denied.');
    // }
    // return context;
  };
};

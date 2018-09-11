const { getByDot } = require('feathers-hooks-common');

module.exports = function isPlatform(platform) {
  return context => getByDot(context.params, 'payload.platform') === platform;
};

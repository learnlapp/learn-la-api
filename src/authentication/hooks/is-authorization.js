const { getByDot } = require('feathers-hooks-common');

module.exports = function isAuthorization() {
  return context => {
    if (getByDot(context.params, 'headers.Authorization')) {
      return context;
    }
  };
};

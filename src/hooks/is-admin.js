const { NotAuthenticated, MethodNotAllowed } = require('@feathersjs/errors');

module.exports = function isAdmin() {
  return async context => {
    const { user } = context.params;
    if (!user) {
      throw new NotAuthenticated();
    }

    if (user.roles.indexOf('admin') === -1) {
      throw new MethodNotAllowed();
    }

    return context;
  };
};

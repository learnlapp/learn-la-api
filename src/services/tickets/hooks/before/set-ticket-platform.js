const { NotAuthenticated } = require('@feathersjs/errors');

module.exports = function setTicketPlatform() {
  return async context => {
    const { platform } = context.params.payload;

    if (!platform) {
      throw new NotAuthenticated();
    }

    context.data.platform = platform;

    return context;
  };
};

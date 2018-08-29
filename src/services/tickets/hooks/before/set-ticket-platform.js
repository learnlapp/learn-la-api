module.exports = function setTicketPlatform(platform) {
  return async context => {
    context.data.platform = platform;

    return context;
  };
};

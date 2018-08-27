module.exports = function setTicketPlatform(platform) {
  return async context => {
    context.data.platform = platform;
    console.log(platform);

    return context;
  };
};

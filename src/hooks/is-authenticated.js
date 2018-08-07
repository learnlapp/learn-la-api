module.exports = function isAuthenticated() {
  return context => {
    if (context && context.params && context.params.authenticated) {
      return context;
    }
  };
};

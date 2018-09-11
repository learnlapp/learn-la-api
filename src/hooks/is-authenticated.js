module.exports = function isAuthenticated() {
  return context => context && context.params && context.params.authenticated;
};

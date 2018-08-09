module.exports = function isAction(tag) {
  return context => context.params.action === tag;
};

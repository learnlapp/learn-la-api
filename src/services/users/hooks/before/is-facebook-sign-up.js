module.exports = function isFacebookSignUp() {
  return context => {
    const { profile } = context.data;
    if (profile && profile.provider === 'facebook') {
      return context;
    }
  };
};

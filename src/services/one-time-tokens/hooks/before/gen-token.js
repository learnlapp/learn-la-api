const RandomString = require('randomstring');

module.exports = function genToken() {
  return context => {
    const token = RandomString.generate({
      length: 12,
      charset: 'alphabetic',
    });

    context.data.token = token;
    return context;
  };
};

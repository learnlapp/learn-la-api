const authy = require('authy');

module.exports = function(app) {
  const { apiKey } = app.get('twillio');

  app.set('twillioClient', authy(apiKey));
};

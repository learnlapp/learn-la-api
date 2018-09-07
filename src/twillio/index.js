const authy = require('authy');

module.exports = function(app) {
  const { apiKey } = app.get('twillio');
  const twillioClient = authy(apiKey);

  app.set('twillioClient', twillioClient);
};

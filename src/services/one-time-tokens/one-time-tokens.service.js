// Initializes the `oneTimeTokens` service on path `/one-time-tokens`
const createService = require('feathers-mongoose');
const createModel = require('../../models/one-time-tokens.model');
const hooks = require('./one-time-tokens.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/one-time-tokens', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('one-time-tokens');

  service.hooks(hooks);
};

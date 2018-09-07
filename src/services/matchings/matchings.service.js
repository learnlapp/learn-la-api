// Initializes the `matchings` service on path `/matchings`
const createService = require('feathers-mongoose');
const createModel = require('../../models/matchings.model');
const hooks = require('./matchings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/matchings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('matchings');

  service.hooks(hooks);
};

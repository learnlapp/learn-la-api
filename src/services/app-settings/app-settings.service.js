// Initializes the `appSettings` service on path `/app-settings`
const createService = require('feathers-mongoose');
const createModel = require('../../models/app-settings.model');
const hooks = require('./app-settings.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/app-settings', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('app-settings');

  service.hooks(hooks);
};

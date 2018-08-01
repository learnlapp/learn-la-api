// Initializes the `versions` service on path `/versions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/versions.model');
const hooks = require('./versions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/versions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('versions');

  service.hooks(hooks);
};

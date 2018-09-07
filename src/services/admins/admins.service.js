// Initializes the `admins` service on path `/admins`
const createService = require('feathers-mongoose');
const createModel = require('../../models/admins.model');
const hooks = require('./admins.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/admins', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('admins');

  service.hooks(hooks);
};

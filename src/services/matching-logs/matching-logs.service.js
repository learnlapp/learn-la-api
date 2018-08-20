// Initializes the `matchingLogs` service on path `/matching-logs`
const createService = require('feathers-mongoose');
const createModel = require('../../models/matching-logs.model');
const hooks = require('./matching-logs.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/matching-logs', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('matching-logs');

  service.hooks(hooks);
};

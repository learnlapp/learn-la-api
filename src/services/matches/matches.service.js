// Initializes the `matches` service on path `/matches`
const createService = require('feathers-mongoose');
const createModel = require('../../models/matches.model');
const hooks = require('./matches.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/matches', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('matches');

  service.hooks(hooks);
};

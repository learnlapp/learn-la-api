// Initializes the `teachers` service on path `/teachers`
const createService = require('feathers-mongoose');
const createModel = require('../../models/teachers.model');
const hooks = require('./teachers.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/teachers', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('teachers');

  service.hooks(hooks);
};

// Initializes the `media-trash` service on path `/media-trash`
const createService = require('feathers-mongoose');
const createModel = require('../../models/media-trash.model');
const hooks = require('./media-trash.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/media-trash', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('media-trash');

  service.hooks(hooks);
};

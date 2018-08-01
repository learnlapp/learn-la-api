// Initializes the `studentAds` service on path `/student-ads`
const createService = require('feathers-mongoose');
const createModel = require('../../models/student-ads.model');
const hooks = require('./student-ads.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/student-ads', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('student-ads');

  service.hooks(hooks);
};

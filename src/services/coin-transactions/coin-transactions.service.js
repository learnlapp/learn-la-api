// Initializes the `coinTransactions` service on path `/coin-transactions`
const createService = require('feathers-mongoose');
const createModel = require('../../models/coin-transactions.model');
const hooks = require('./coin-transactions.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/coin-transactions', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('coin-transactions');

  service.hooks(hooks);
};

const mongoose = require('mongoose');

module.exports = function(app) {
  mongoose.set('useCreateIndex', true);
  mongoose.connect(
    app.get('mongodb'),
    {
      useNewUrlParser: true,
      // useCreateIndex: true,
    }
  );
  mongoose.Promise = global.Promise;

  app.set('mongooseClient', mongoose);
};

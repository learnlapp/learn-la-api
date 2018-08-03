// versions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const versions = new Schema(
    {
      platform: { type: String, required: true },
      minimum: { type: String, required: true },
      latest: { type: String, required: true },
    },
    {
      timestamps: true,
      collection: 'versions',
    },
  );

  return mongooseClient.model('versions', versions);
};

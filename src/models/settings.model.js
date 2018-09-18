// settings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const settings = new Schema(
    {
      platform: { type: String, required: true, unique: true },
      achievement: { type: Object },
      coin: {
        pricing: {
          launchAd: { type: Number, default: 10 },
          matching: { type: Number, default: 10 },
        },
        free: {
          profileCompletion: { type: Number, default: 200 },
          launchAd: { type: Number, default: 10 },
          matching: { type: Number, default: 10 },
        },
        reward: {
          feedback: { type: Number, default: 10 },
          reportError: { type: Number, default: 10 },
        },
      },
      version: {
        min: { type: String, default: '0.0.0' },
        latest: { type: String, default: '0.0.0' },
      },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('settings', settings);
};

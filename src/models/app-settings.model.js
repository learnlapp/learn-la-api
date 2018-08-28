// appSettings-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const appSettings = new Schema(
    {
      platform: { type: String, required: true, unique: true },
      // coin
      welcomeCoin: { type: Number, default: 200 },
      freeAdsQuota: { type: Number, default: 10 },
      freeAdsQuotaLeft: { type: Number, default: 10 },
      freeApplyQuota: { type: Number, default: 10 },
      freeApplyQuotaLeft: { type: Number, default: 10 },

      // version
      minimumVersion: { type: String, default: '0.0.0' },
      latestVersion: { type: String, default: '0.0.0' },
    },
    {
      timestamps: true,
      collection: 'appSettings',
    }
  );

  return mongooseClient.model('appSettings', appSettings);
};

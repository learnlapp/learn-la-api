module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const oneTimeTokens = new Schema(
    {
      phone: { type: String, required: true, unique: true },
      token: { type: String, required: true },
    },
    {
      timestamps: true,
      collection: 'one-time-tokens',
    }
  );

  oneTimeTokens.index({ updatedAt: 1 }, { expireAfterSeconds: 900 });
  return mongooseClient.model('oneTimeTokens', oneTimeTokens);
};

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const matchingLogs = new Schema(
    {
      matchingId: { type: Schema.Types.ObjectId, required: true },
      from: { type: String, required: true },
      to: { type: String, required: true },
      logId: { type: String, required: true },
      read: { type: Date },
      extra: { type: Object },
    },
    {
      timestamps: true,
      collection: 'matching-logs',
    }
  );

  matchingLogs.index({ to: 1, matchingId: 1 });
  return mongooseClient.model('matchingLogs', matchingLogs);
};

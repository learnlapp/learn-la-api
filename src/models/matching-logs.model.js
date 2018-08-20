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
      collection: 'matchingLogs',
    }
  );

  return mongooseClient.model('matchingLogs', matchingLogs);
};

// tickets-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const logSchema = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, required: true },
      tex: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const tickets = new Schema(
    {
      platform: { type: String, required: true },
      type: { type: String, required: true },
      studentId: { type: Schema.Types.ObjectId },
      teacherId: { type: Schema.Types.ObjectId },
      matchingId: { type: Schema.Types.ObjectId },
      reason: { type: String },
      content: { type: String, required: true },
      images: { type: [String] },
      logs: { type: [logSchema] },
      status: { type: String, default: 'pending' },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('tickets', tickets);
};

// achievements-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const achievements = new Schema(
    {
      category: { type: String, required: true },
      type: { type: String, required: true },
      ownerType: { type: String, required: true },
      ownerId: { type: Schema.Types.ObjectId, required: true },
      coin: { type: Number, required: true },
      status: { type: String, default: 'new' },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('achievements', achievements);
};

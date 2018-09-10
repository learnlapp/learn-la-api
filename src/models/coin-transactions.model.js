module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const coinTransactions = new Schema(
    {
      method: { type: String, required: true },
      type: { type: String, required: true }, // in | out
      amount: { type: Number, required: true },
      description: { type: String, required: true },

      handledBy: { type: String, required: true }, // system | admin
      adminId: { type: Schema.Types.ObjectId },

      ownerType: { type: String }, // students | teachers
      ownerId: { type: Schema.Types.ObjectId },

      ref: { type: String }, // model
      refId: { type: Schema.Types.ObjectId }, // modelId
    },
    {
      timestamps: true,
      collection: 'coin-transactions',
    }
  );

  return mongooseClient.model('coinTransactions', coinTransactions);
};

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const coinTransactions = new Schema(
    {
      method: { type: String, required: true }, // in | out
      type: { type: String, required: true }, // in | out
      amount: { type: Number, required: true },
      description: { type: String, required: true },

      handledBy: { type: String, required: true }, // system | admin
      adminId: { type: Schema.Types.ObjectId },

      ownerType: { type: String }, // students | teachers
      ownerId: { type: Schema.Types.ObjectId },

      ref: { type: String },
      refId: { type: Schema.Types.ObjectId },
    },
    {
      timestamps: true,
      collection: 'coin-transactions',
    }
  );

  coinTransactions.index({ ownerType: 1, ownerId: 1 });
  return mongooseClient.model('coinTransactions', coinTransactions);
};

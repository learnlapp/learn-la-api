// coinTransactions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
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

      ref: { type: String },
      refId: { type: Schema.Types.ObjectId },
    },
    {
      timestamps: true,
      collection: 'coin-transactions',
    }
  );

  return mongooseClient.model('coinTransactions', coinTransactions);
};

// coinTransactions-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const coinTransactions = new Schema(
    {
      type: { type: String, required: true }, // in | out
      amount: { type: Number, required: true },
      description: { type: String, required: true },

      ownerType: { type: String }, // student | teacher
      studentId: { type: Schema.Types.ObjectId },
      teacherId: { type: Schema.Types.ObjectId },

      ref: { type: String, required: true },
      paymentId: { type: Schema.Types.ObjectId },
      matchingId: { type: Schema.Types.ObjectId },
      adminId: { type: Schema.Types.ObjectId },
      courseAdId: { type: Schema.Types.ObjectId },
      studentAdId: { type: Schema.Types.ObjectId },
    },
    {
      timestamps: true,
      collection: 'coinTransactions',
    }
  );

  return mongooseClient.model('coinTransactions', coinTransactions);
};

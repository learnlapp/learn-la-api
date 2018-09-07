module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const admins = new Schema(
    {
      name: { type: String, required: true },
      email: { type: String, unique: true },
      phone: { type: String, unique: true },
      phoneNumber: { type: String, required: true },
      countryCode: { type: String, required: true, default: '852' },
      status: { type: String, required: true, default: 'new' },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('admins', admins);
};

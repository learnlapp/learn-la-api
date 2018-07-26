// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const users = new mongooseClient.Schema(
    {
      phone: { type: String, trim: true, unique: true, sparse: true },
      countryCode: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
      email: { type: String, lowercase: true, trim: true },
      password: { type: String },
      facebookId: { type: String, unique: true, sparse: true },

      name: { type: String },
      avatar: { type: String },
      birthday: { type: Date },
      gender: { type: String, lowercase: true },

      roles: { type: [String] },
      permissions: { type: [String] },

      status: { type: String, default: 'new' },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('users', users);
};

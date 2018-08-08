// users-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const users = new Schema(
    {
      phone: { type: String, trim: true, unique: true, sparse: true },
      countryCode: { type: String, trim: true },
      phoneNumber: { type: String, trim: true },
      email: { type: String, lowercase: true, trim: true },
      password: { type: String },
      facebookId: { type: String, unique: true, sparse: true },

      // name: { type: String },
      // avatar: { type: String },
      // birthday: { type: Date },
      // gender: { type: String, lowercase: true },

      teacherId: { type: Schema.Types.ObjectId },
      studentId: { type: Schema.Types.ObjectId },

      roles: { type: [String] },
      permissions: { type: [String] },

      status: { type: String, default: 'new' },
    },
    {
      timestamps: true,
      collection: 'users',
    },
  );

  return mongooseClient.model('users', users);
};

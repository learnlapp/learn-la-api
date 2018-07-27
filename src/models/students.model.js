// students-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
const {
  LocationSchema,
  VerificationSchema,
  CourseSchema,
  TimeslotSchema,
} = require('./customTypes');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const students = new Schema(
    {
      userId: { type: Schema.Types.ObjectId, required: true, unique: true },

      role: { type: String }, // personal / organization
      childName: { type: String },
      childImage: { type: String },
      educationLevel: { type: String },

      interests: { type: [String] },
      courses: { type: [CourseSchema] },
      timeslots: { type: [TimeslotSchema] },
      locations: { type: [LocationSchema] },

      notifications: { type: [String], default: ['analytics', 'marketing'] },
      verifications: { type: [VerificationSchema] },

      extra: { type: Object },
      device: { type: Object },
      status: { type: String },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('students', students);
};

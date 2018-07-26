// teachers-model.js - A mongoose model
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

  const teachers = new Schema(
    {
      // name, phone, email, avatar, gender
      userId: { type: Schema.Types.ObjectId, required: true, unique: true },

      role: { type: String }, // personal / organization
      organization: { type: String },
      // occupation: { type: String },
      video: { type: String },
      educationLevel: { type: String },
      school: { type: String },
      // district: { type: String },
      // bio: { type: String },

      profession: { type: String },
      award: { type: String },

      // timetable: { type: [Number] },
      timeslots: {
        type: [TimeslotSchema],
        default: [{ days: [1, 3, 5], startTime: '09:00', endTime: '18:00' }],
      },
      courses: { type: [CourseSchema] },
      removedCourses: { type: [CourseSchema] },
      locations: { type: [LocationSchema] },

      experience: { type: Number },
      duration: { type: Number, default: 60 }, // in mins
      fee: { type: Number, default: 200 }, // charge per course
      acceptMultiStudent: { type: Boolean, default: false },
      additionalCostPerHead: { type: Number, default: 50 },

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

  return mongooseClient.model('teachers', teachers);
};

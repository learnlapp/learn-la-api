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
      facebookId: { type: String, unique: true, sparse: true },
      phone: { type: String, unique: true, sparse: true },
      phoneNumber: { type: String },
      countryCode: { type: String },

      password: { type: String },

      name: { type: String, requiredd: true },
      avatar: { type: String },
      birthday: { type: Date },
      gender: { type: String, lowercase: true },
      role: { type: String, default: 'student' }, // personal / organization
      childName: { type: String },
      childImage: { type: String },
      educationLevel: { type: String },

      interests: { type: [String] },
      courses: { type: [CourseSchema] },
      timeslots: {
        type: [TimeslotSchema],
        default: [
          { days: [1, 2, 3, 4, 5, 6, 7], startTime: '00:00', endTime: '23:45' },
        ],
      },
      timeTable: { type: [Number] },
      locations: { type: [LocationSchema] },

      notifications: { type: [String], default: ['analytics', 'marketing'] },
      verifications: { type: [VerificationSchema] },

      bookmarks: { type: [Schema.Types.ObjectId] },

      extra: { type: Object },
      device: { type: Object },
      status: { type: String, default: 'new' },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('students', students);
};

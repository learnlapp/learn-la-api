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
      userId: { type: Schema.Types.ObjectId, required: true, unique: true },
      name: { type: String },
      avatar: { type: String },
      birthday: { type: Date },
      gender: { type: String, lowercase: true },

      role: { type: String, default: 'teacher' }, // personal / organization
      organization: { type: String },

      educationLevel: { type: String },
      school: { type: String },

      profession: { type: String },
      award: { type: String },

      // timetable: { type: [Number] },
      timeslots: {
        type: [TimeslotSchema],
        default: [{ days: [1, 3, 5], startTime: '09:00', endTime: '18:00' }],
      },
      timeTable: { type: [Number] },
      courses: { type: [CourseSchema] },
      locations: { type: [LocationSchema] },

      experience: { type: Number },
      duration: { type: Number, default: 60 }, // in mins
      fee: { type: Number, default: 200 }, // charge per course
      acceptMultiStudent: { type: Boolean, default: false },
      additionalCostPerHead: { type: Number, default: 50 },

      notifications: { type: [String], default: ['analytics', 'marketing'] },
      verifications: { type: [VerificationSchema] },

      bookmarks: { type: [Schema.Types.ObjectId] },

      extra: { type: Object },
      device: { type: Object },
      status: { type: String },
    },
    {
      timestamps: true,
      collection: 'teachers',
    },
  );

  return mongooseClient.model('teachers', teachers);
};

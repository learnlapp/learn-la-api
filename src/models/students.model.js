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
      name: { type: String },
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

      coin: { type: Number },
      credit: { type: Number },
      // freeAdsQuota: { type: Number },
      freeApplyQuota: { type: Number },
      freeApplyQuotaLeft: { type: Number },

      extra: { type: Object },
      device: { type: Object },
      status: { type: String, default: 'new' },
    },
    {
      timestamps: true,
      collection: 'students',
    }
  );

  return mongooseClient.model('students', students);
};

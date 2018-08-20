const { LocationSchema, TimeslotSchema } = require('./customTypes');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const matchings = new Schema(
    {
      studentId: { type: Schema.Types.ObjectId, required: true },
      teacherId: { type: Schema.Types.ObjectId, required: true },

      // type: 'studentAd' || 'courseAd'
      type: { type: String, required: true },
      courseAdId: { type: Schema.Types.ObjectId },
      studentAdId: { type: Schema.Types.ObjectId },

      studentHeadline: { type: String, required: true },
      teacherHeadline: { type: String, required: true },

      title: { type: String, required: true },
      category: { type: String, required: true },
      level: { type: Number, required: true },

      timeslots: { type: [TimeslotSchema] },
      timeTable: { type: [Number] },
      location: { type: LocationSchema, required: true },
      duration: { type: Number, required: true },
      homeTuition: { type: Boolean, required: true },
      startDate: { type: Date, required: true },

      numOfStudents: { type: Number, default: 1 },
      noSmoking: { type: Boolean },
      requireQualificationProof: { type: Boolean },
      fee: { type: Number, required: true },

      isStudentPhoneGiven: { type: Boolean },
      isTeacherPhoneGiven: { type: Boolean },

      latestLogForStudentCreatedAt: { type: Date },
      latestLogForTeacherCreatedAt: { type: Date },

      expiredAt: { type: Date },
      archivedAt: { type: Date },
      studentRemovedAt: { type: Date },
      teacherRemovedAt: { type: Date },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('matchings', matchings);
};

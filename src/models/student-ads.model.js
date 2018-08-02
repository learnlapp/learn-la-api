const { LocationSchema, TimeslotSchema } = require('./customTypes');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const studentAds = new Schema(
    {
      studentId: { type: Schema.Types.ObjectId, required: true },
      title: { type: String },
      category: { type: String },
      level: { type: Number },
      description: { type: String },
      images: { type: [String] },

      timeslots: { type: [TimeslotSchema] },
      timeTable: { type: [Number] },
      location: { type: LocationSchema },
      duration: { type: Number },
      fee: { type: Number },
      currency: { type: String, default: 'hkd' },
      numOfStudents: { type: Number },

      homeTuition: { type: Boolean, default: true },
      minAge: { type: Number },
      maxAge: { type: Number },
      noSmoking: { type: Boolean },
      genderPref: { type: String },
      requireQualificationProof: { type: Boolean },

      expiredAt: { type: Date },
      removedAt: { type: Date },
      onlineAt: { type: Date },
      // new -> complete -> archive | Del
      status: { type: String, required: true, default: 'new' },
    },
    {
      timestamps: true,
    },
  );

  return mongooseClient.model('student-ads', studentAds);
};

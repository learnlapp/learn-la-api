const { LocationSchema, TimeslotSchema } = require('./customTypes');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;

  const PredefinedMessage = new Schema(
    {
      sentBy: { type: Schema.Types.ObjectId, required: true },
      text: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );

  const matchings = new Schema(
    {
      studentId: { type: Schema.Types.ObjectId, required: true },
      teacherId: { type: Schema.Types.ObjectId, required: true },
      // type: 'studentAd' || 'courseAd'
      type: { type: String, required: true },
      courseAdId: { type: Schema.Types.ObjectId },
      studentAdId: { type: Schema.Types.ObjectId },

      // title: { type: String, required: true },
      // category: { type: String, required: true },
      // level: { type: Number, required: true },
      //
      // timeslots: { type: [TimeslotSchema] },
      // timeTable: { type: [Number] },
      // location: { type: LocationSchema, required: true },
      // duration: { type: Number, required: true },
      // homeTuition: { type: Boolean, required: true },

      exchangeContact: { type: String },

      messages: { type: [PredefinedMessage] },
      // startDate: { type: Date, required: true },

      numOfStudents: { type: Number, default: 1 },
      noSmoking: { type: Boolean },
      requireQualificationProof: { type: Boolean },

      expiredAt: { type: Date },
      archivedAt: { type: Date },
      removedAt: { type: Date },
    },
    {
      timestamps: true,
    }
  );

  return mongooseClient.model('matchings', matchings);
};

const { LocationSchema, TimeslotSchema } = require('./customTypes');

module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const courseAds = new Schema(
    {
      teacherId: { type: Schema.Types.ObjectId, required: true },
      title: { type: String },
      category: { type: String },
      level: { type: Number },
      description: { type: String },
      images: { type: [String] },
      experience: { type: Number },

      timeslots: { type: [TimeslotSchema] },
      timeTable: { type: [Number] },
      location: { type: LocationSchema },
      duration: { type: Number },
      fee: { type: Number },
      currency: { type: String, default: 'hkd' },
      acceptMultiStudent: { type: Boolean },
      additionalCostPerHead: { type: Number },

      homeTuition: { type: Boolean, default: true },
      offerTrial: { type: Boolean },

      minAge: { type: Number },
      maxAge: { type: Number },

      expiredAt: { type: Date },
      removedAt: { type: Date },
      onlineAt: { type: Date },
      // new -> complete -> archive | Del
      status: { type: String, required: true, default: 'new' },
    },
    {
      timestamps: true,
      collection: 'course-ads',
    }
  );

  return mongooseClient.model('courseAds', courseAds);
};

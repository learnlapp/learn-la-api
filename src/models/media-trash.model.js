// media-trash-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function(app) {
  const mongooseClient = app.get('mongooseClient');
  const { Schema } = mongooseClient;
  const mediaTrash = new Schema(
    {
      mediaType: { type: String, required: true },
      model: { type: String, required: true },
      subdocument: { type: String },
      field: { type: String, required: true },
      public_id: { type: String, required: true },
      studentId: { type: Schema.Types.ObjectId },
      teacherId: { type: Schema.Types.ObjectId },
      ticketId: { type: Schema.Types.ObjectId },
      courseAdId: { type: Schema.Types.ObjectId },
      studentAdId: { type: Schema.Types.ObjectId },
      courseId: { type: Schema.Types.ObjectId },
      verificationId: { type: Schema.Types.ObjectId },
    },
    {
      timestamps: true,
      collection: 'media-trash',
    }
  );

  return mongooseClient.model('mediaTrash', mediaTrash);
};

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
      documentId: { type: Schema.Types.ObjectId },
      subdocument: { type: String },
      subdocumentId: { type: Schema.Types.ObjectId },
      fieldName: { type: String, required: true },
      public_id: { type: String, required: true },
    },
    {
      timestamps: true,
      collection: 'media-trash',
    }
  );

  return mongooseClient.model('mediaTrash', mediaTrash);
};

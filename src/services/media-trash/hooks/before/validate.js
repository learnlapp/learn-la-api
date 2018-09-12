const { BadRequest } = require('@feathersjs/errors');

module.exports = function validate() {
  return context => {
    const { model, documentId, subdocument, subdocumentId } = context.data;

    if ((model && !documentId) || (!model && documentId)) {
      throw new BadRequest(`model and documentId should be supply in pairs.`);
    }

    if ((subdocument && !subdocumentId) || (!subdocument && subdocumentId)) {
      throw new BadRequest(
        `subdocument and subdocumentId should be supply in pairs.`
      );
    }

    return context;
  };
};

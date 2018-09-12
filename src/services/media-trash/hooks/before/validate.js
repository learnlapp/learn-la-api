const { BadRequest } = require('@feathersjs/errors');

module.exports = function validate() {
  return context => {
    const { subdocument, subdocumentId } = context.data;

    if ((subdocument && !subdocumentId) || (!subdocument && subdocumentId)) {
      throw new BadRequest(
        `subdocument and subdocumentId should be supply in pairs.`
      );
    }

    return context;
  };
};

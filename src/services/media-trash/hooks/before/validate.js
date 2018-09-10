const { BadRequest } = require('@feathersjs/errors');

module.exports = function validate() {
  return context => {
    const { model, subdocument } = context.data;

    if (!model) {
      throw new BadRequest('model is required.');
    }

    if (!context.data[`${model.slice(0, -1)}Id`]) {
      throw new BadRequest(`${model.slice(0, -1)}Id is required.`);
    }

    if (subdocument && !context.data[`${subdocument.slice(0, -1)}Id`]) {
      throw new BadRequest(`${subdocument.slice(0, -1)}Id is requiired.`);
    }

    return context;
  };
};

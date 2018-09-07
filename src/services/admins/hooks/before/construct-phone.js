const { BadRequest } = require('@feathersjs/errors');

module.exports = function contructPhone() {
  return context => {
    const { phoneNumber, countryCode } = context.data;

    if (!phoneNumber) {
      throw new BadRequest('Phone number is missing');
    }

    if (!countryCode) {
      throw new BadRequest('Country code is missing');
    }

    context.data.phone = `${countryCode.trim()}${phoneNumber.trim()}`;

    return context;
  };
};

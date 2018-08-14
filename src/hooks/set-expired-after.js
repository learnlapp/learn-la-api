const dayjs = require('dayjs');

module.exports = function setExpiredAfter(num, unit) {
  return context => {
    if (!num || !unit) {
      throw new Error('missing parameter(s)');
    }

    if (typeof num !== 'number' || typeof unit !== 'string') {
      throw new Error('invalid parameter type');
    }

    const units = ['year', 'month', 'week', 'day', 'hour', 'minute'];
    if (units.indexOf(unit) === -1) {
      throw new Error('invalid unit');
    }

    context.data.expiredAt = dayjs().add(num, unit);

    return context;
  };
};

const dayjs = require('dayjs');

module.exports = function setExpiredAfter(initialDate, num, unit) {
  return context => {
    if (!initialDate || !num || !unit) {
      throw new Error('missing parameter(s)');
    }
    console.log('typeof', typeof initialDate);

    if (typeof num !== 'number' || typeof unit !== 'string') {
      throw new Error('invalid parameter type');
    }

    const units = ['year', 'month', 'week', 'day', 'hour', 'minute'];
    if (units.indexOf(unit) === -1) {
      throw new Error('invalid unit');
    }

    context.data.expiredAt = dayjs(initialDate).add(num, unit);

    return context;
  };
};

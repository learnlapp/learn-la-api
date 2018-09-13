const dayjs = require('dayjs');

module.exports = function isSettingOnline() {
  return context => {
    const { data } = context;

    if ('onlineAt' in data && dayjs(data.onlineAt).isValid()) {
      return true;
    }
  };
};

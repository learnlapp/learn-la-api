module.exports = function noRecordFound() {
  return context => {
    const { result } = context;

    if (typeof result === 'object' && result.total === 0) {
      return context;
    }

    if (Array.isArray(result) && result.length === 0) {
      return context;
    }
  };
};

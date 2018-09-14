module.exports = function saveIdToTransaction() {
  return context => {
    const { transactionId } = context.params;
    const { _id } = context.result;

    if (transactionId) {
      context.app.service('coin-transactions').patch(transactionId, {
        ref: 'matchings',
        refId: _id,
      });
      context.params.transactionId = undefined;
    }

    return context;
  };
};

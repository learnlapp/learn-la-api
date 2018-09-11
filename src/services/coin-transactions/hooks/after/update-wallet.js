module.exports = function updateWallet() {
  return async context => {
    const { method, amount, ownerType, ownerId } = context.result;

    if (!amount) {
      return context;
    }

    if (method === 'in') {
      context.app
        .service(`${ownerType}s`)
        .patch(ownerId, { $inc: { coin: amount } });
    }

    if (method === 'out') {
      context.app
        .service(`${ownerType}s`)
        .patch(ownerId, { $inc: { coin: -amount } });
    }

    return context;
  };
};

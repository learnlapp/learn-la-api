module.exports = function updateProfile() {
  return async context => {
    const { method, amount, ownerType, ownerId } = context.result;

    if (method === 'in') {
      context.app.service(ownerType).patch(ownerId, { $inc: { coin: amount } });
      return context;
    }

    if (method === 'out') {
      context.app
        .service(ownerType)
        .patch(ownerId, { $inc: { coin: -amount } });
      return context;
    }
  };
};

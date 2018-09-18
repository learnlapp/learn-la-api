module.exports = function finishRedeem() {
  return async context => {
    const { _id, coin, ownerType, ownerId } = context.result;

    context.app.service('coin-transactions').create({
      method: 'in',
      type: 'achievement',
      handledBy: 'system',
      ownerType,
      ownerId,
      ref: 'achievements',
      refId: _id,
      description: `Get ${coin} coins from achievement.`,
      amount: coin,
    });

    return context;
  };
};

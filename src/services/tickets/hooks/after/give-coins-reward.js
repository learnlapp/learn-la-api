module.exports = function giveCoinsReward() {
  return async context => {
    const { _id, ownerId, platform, type } = context.result;
    const settings = context.app.get('appSettings')[platform];
    const { reward } = settings.coin;

    let description;
    switch (type) {
      case 'feedback':
        description = `Free ${
          reward[type]
        } coins reward for writing a feedback.`;
        break;

      case 'reportError':
        description = `Free ${
          reward[type]
        } coins reward for reporting error(s).`;
        break;

      default:
        description = `Free ${reward[type]} coins reward.`;
        break;
    }

    context.app.service('coin-transactions').create({
      method: 'in',
      type: 'reward',
      handledBy: 'system',
      ownerType: platform,
      ownerId,
      ref: 'tickets',
      refId: _id,
      description,
      amount: reward[type],
    });

    return context;
  };
};

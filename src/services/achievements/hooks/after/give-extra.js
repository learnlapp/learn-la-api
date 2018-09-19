module.exports = function giveExtra() {
  return async context => {
    const { category, ownerType, ownerId } = context.result;
    const settings = context.app.get('appSettings')[ownerType];
    const { extra } = settings.achievement[category];

    const achievements = await context.app.service('achievements').find({
      query: { category, ownerType, ownerId, $sort: { createdAt: -1 } },
      paginate: false,
    });

    if (achievements.length) {
      let count = 0;
      for (let doc of achievements) {
        if (doc.type === 'extra') {
          return context;
        }

        if (extra.requiredItems.indexOf(doc.type) !== -1) {
          count++;
        }
      }

      if (count === extra.requiredItems.length) {
        context.app.service('achievements').create({
          category,
          type: 'extra',
          ownerType,
          ownerId,
          coin: extra.coin,
        });
      }
    }

    return context;
  };
};

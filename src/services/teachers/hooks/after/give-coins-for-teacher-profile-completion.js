module.exports = function giveCoinsForProfileCompletion() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { profileCompletion } = teacherSettings.coin.free;

    await context.app.service('coin-transactions').create({
      method: 'in',
      type: 'profile-completion',
      handledBy: 'system',
      ownerType: 'teacher',
      ownerId: context.id,
      description: `Free ${profileCompletion} coins for completing profile.`,
      amount: profileCompletion,
    });

    context.dispatch = {
      ...context.dispatch,
      coin: profileCompletion,
    };

    return context;
  };
};

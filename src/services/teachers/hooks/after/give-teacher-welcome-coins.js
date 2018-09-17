module.exports = function giveTeacherWelcomeCoins() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { welcomeCoin } = teacherSettings;

    await context.app.service('coin-transactions').create({
      method: 'in',
      type: 'welcome-coins',
      handledBy: 'system',
      ownerType: 'teacher',
      ownerId: context.id,
      description: `Free ${welcomeCoin} coins for completing profile.`,
      amount: welcomeCoin,
    });

    context.dispatch = {
      ...context.dispatch,
      coin: welcomeCoin,
    };

    return context;
  };
};

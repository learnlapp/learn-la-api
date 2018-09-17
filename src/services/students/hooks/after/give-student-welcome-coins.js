const { NotFound } = require('@feathersjs/errors');

module.exports = function giveStudentWelcomeCoins() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { welcomeCoin } = studentSettings;

    await context.app.service('coin-transactions').create({
      method: 'in',
      type: 'welcome-coins',
      handledBy: 'system',
      ownerType: 'student',
      ownerId: context.result._id,
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

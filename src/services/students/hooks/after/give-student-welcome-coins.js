const { NotFound } = require('@feathersjs/errors');

module.exports = function giveStudentWelcomeCoins() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { welcomeCoin } = studentSettings;
    const { _id } = context.result;

    await context.app.service('coin-transactions').create({
      method: 'in',
      type: 'welcome-coins',
      handledBy: 'system',
      ownerType: 'student',
      ownerId: _id,
      description: `Free ${welcomeCoin} coins for new sign up.`,
      amount: welcomeCoin,
    });

    return context;
  };
};

const { NotFound } = require('@feathersjs/errors');

module.exports = function giveTeacherWelcomeCoins() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { welcomeCoin } = teacherSettings;
    const { _id } = context.result;

    await context.app.service('coin-transactions').create({
      method: 'in',
      type: 'welcome-coins',
      handledBy: 'system',
      ownerType: 'teacher',
      ownerId: _id,
      description: `Free ${welcomeCoin} coins for new sign up.`,
      amount: welcomeCoin,
    });

    return context;
  };
};

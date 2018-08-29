const { NotFound } = require('@feathersjs/errors');

module.exports = function giveTeacherWelcomeCoins() {
  return async context => {
    const { _id } = context.result;

    const { data } = await context.app
      .service('app-settings')
      .find({ query: { platform: 'teacher' } });

    if (data.length <= 0) {
      throw new NOtFound('No app setting found.');
    }

    await context.app.service('coin-transactions').create({
      type: 'in',
      ownerType: 'teacher',
      teacherId: _id,
      description: `Free ${data[0].welcomeCoin} coins for new sign up.`,
      ref: 'system',
      amount: data[0].welcomeCoin,
    });

    return context;
  };
};

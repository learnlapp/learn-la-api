module.exports = function giveCoinsForStudentProfileCompletion() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { profileCompletion } = studentSettings.coin.free;

    await context.app.service('coin-transactions').create({
      method: 'in',
      type: 'profile-completion',
      handledBy: 'system',
      ownerType: 'student',
      ownerId: context.result._id,
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

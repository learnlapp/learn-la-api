module.exports = function createAchievementForPhoneAssoicated() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { achievement } = studentSettings;

    context.app.service('achievements').create({
      category: 'signUp',
      type: 'phone',
      ownerType: 'student',
      ownerId: context.result._id,
      coin: achievement.signUp.phone,
    });

    return context;
  };
};

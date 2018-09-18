module.exports = function createAchievementForPhoneAssoicated() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { achievement } = teacherSettings;

    context.app.service('achievements').create({
      category: 'signUp',
      type: 'phone',
      ownerType: 'teacher',
      ownerId: context.result._id,
      coin: achievement.signUp.phone,
    });

    return context;
  };
};

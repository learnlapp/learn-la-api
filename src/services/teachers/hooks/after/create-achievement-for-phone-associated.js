module.exports = function createAchievementForPhoneAssoicated() {
  return async context => {
    const { phone } = context.result;
    const teacherSettings = context.app.get('appSettings').teacher;
    const { achievement } = teacherSettings;

    if (phone) {
      context.app.service('achievements').create({
        category: 'signUp',
        type: 'phone',
        ownerType: 'teacher',
        ownerId: context.result._id,
        coin: achievement.signUp.phone,
      });
    }

    return context;
  };
};

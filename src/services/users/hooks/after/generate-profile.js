module.exports = function generateProfile() {
  return async context => {
    const { platform } = context.params;
    const { _id, roles } = context.result;
    console.log('generating profile ', context.result);
    if (platform === 'teacher') {
      const profile = await context.app
        .service('teachers')
        .create({ userId: _id });
      return context;
    }

    if (platform === 'student') {
      await context.app.service('students').create({ userId: _id });
      return context;
    }
  };
};

module.exports = function attachOrGenerateProfile() {
  return async context => {
    const { platform } = context.data;
    const { user } = context.params;

    if (platform === 'admin') {
      context.result.user = user;
      return context;
    }

    let profile = {};

    if (platform === 'teacher') {
      if (user.roles.indexOf('teacher') === -1) {
        profile = await context.app
          .service('teachers')
          .create({ userId: user._id, roles: { $push: 'teacher' } });
      } else {
        const data = await context.app.service('teachers').find({
          query: {
            userId: user._id,
          },
          paginate: false,
        });

        profile = data[0];
      }
      context.params.payload.teacherId = profile._id;
      context.result.profile = profile;
      return context;
    }

    if (platform === 'students') {
      if (user.roles.indexOf('student') === -1) {
        profile = await context.app
          .service('students')
          .create({ userId: user._id });
      } else {
        const data = await context.app.service('students').find({
          query: {
            userId: user._id,
          },
          paginate: false,
        });

        profile = data[0];
      }
      context.params.payload.studentId = profile._id;
      context.result.profile = profile;
      return context;
    }
  };
};

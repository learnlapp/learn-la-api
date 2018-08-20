const resolvers = {
  joins: {
    teacher: (...args) => async (courseAd, context) => {
      courseAd.teacher = await context.app
        .service('teachers')
        .get(courseAd.teacherId, {
          query: {
            // $select: { password: 0 },
          },
          fastJoinQuery: { user: false },
        });
    },
  },
};

module.exports = resolvers;

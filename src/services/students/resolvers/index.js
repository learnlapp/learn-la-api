const resolvers = {
  joins: {
    user: (...args) => async (teacher, context) => {
      teacher.user = await context.app.service('users').get(teacher.userId, {
        query: {
          $select: { password: 0 },
        },
      });
    },
  },
};

module.exports = resolvers;

const resolvers = {
  joins: {
    user: (...args) => async (student, context) => {
      student.user = await context.app.service('users').get(student.userId, {
        query: {
          $select: { password: 0 },
        },
      });
    },
  },
};

module.exports = resolvers;

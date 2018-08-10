const resolvers = {
  joins: {
    teacher: (...args) => async (match, context) => {
      match.teacher = await context.app
        .service('teachers')
        .get(match.teacherId, {
          query: {
            // $select: { password: 0 },
          },
        });
    },
    student: (...args) => async (match, context) => {
      match.teacher = await context.app
        .service('students')
        .get(match.studentId, {
          query: {
            // $select: { password: 0 },
          },
        });
    },
  },
};

module.exports = resolvers;

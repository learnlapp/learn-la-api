const resolvers = {
  joins: {
    student: (...args) => async (studentAd, context) => {
      studentAd.student = await context.app
        .service('students')
        .get(studentAd.studentId, {
          query: {
            // $select: { password: 0 },
          },
        });
    },
  },
};

module.exports = resolvers;

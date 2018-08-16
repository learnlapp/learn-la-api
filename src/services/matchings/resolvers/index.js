const resolvers = {
  joins: {
    teacher: (...args) => async (matching, context) => {
      matching.teacher = await context.app
        .service('teachers')
        .get(matching.teacherId, {
          query: {
            // $select: { password: 0 },
          },
        });
    },
    student: (...args) => async (matching, context) => {
      matching.teacher = await context.app
        .service('students')
        .get(matching.studentId, {
          query: {
            // $select: { password: 0 },
          },
        });
    },
    unread: (...args) => async (matching, context) => {
      const { payload } = context.params;

      if (payload && payload.studentId) {
        const { total } = await context.app.service('matching-logs').find({
          query: {
            matchingId: matching._id,
            to: 'student',
            read: { $exists: false },
            $limit: 0,
          },
        });

        matching.unread = total;
      }

      if (payload && payload.teacherId) {
        const { total } = await context.app.service('matching-logs').find({
          query: {
            matchingId: matching._id,
            to: 'teacher',
            read: { $exists: false },
            $limit: 0,
          },
        });

        matching.unread = total;
      }
    },
  },
};

module.exports = resolvers;

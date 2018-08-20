const resolvers = {
  joins: {
    teacher: (...args) => async (matching, context) => {
      let fastJoinQuery = { user: false };

      if (matching.isStudentPhoneGiven && matching.isTeacherPhoneGiven) {
        fastJoinQuery = { user: true };
      }

      return (matching.teacher = await context.app
        .service('teachers')
        .get(matching.teacherId, {
          query: {
            // $select: { password: 0 },
          },
          fastJoinQuery,
        }));
    },
    student: (...args) => async (matching, context) => {
      let fastJoinQuery = { user: false };

      if (matching.isStudentPhoneGiven && matching.isTeacherPhoneGiven) {
        fastJoinQuery = { user: true };
      }

      return (matching.student = await context.app
        .service('students')
        .get(matching.studentId, {
          query: {
            // $select: { password: 0 },
          },
          fastJoinQuery,
        }));
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

        return (matching.unread = total);
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

        return (matching.unread = total);
      }
    },
  },
};

module.exports = resolvers;

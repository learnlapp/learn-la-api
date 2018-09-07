const resolvers = {
  joins: {
    student: () => async (matching, context) => {
      const $select =
        matching.isStudentPhoneGiven && matching.isTeacherPhoneGiven
          ? { password: 0 }
          : { password: 0, phone: 0, phoneNumber: 0 };

      return (matching.student = await context.app
        .service('students')
        .get(matching.studentId, {
          query: {
            $select,
          },
        }));
    },

    teacher: (...args) => async (matching, context) => {
      const $select =
        matching.isStudentPhoneGiven && matching.isTeacherPhoneGiven
          ? { password: 0 }
          : { password: 0, phone: 0, phoneNumber: 0 };

      return (matching.teacher = await context.app
        .service('teachers')
        .get(matching.teacherId, {
          query: {
            $select,
          },
        }));
    },

    unreadStudentLogsCount: () => async (matching, context) => {
      const { total } = await context.app.service('matching-logs').find({
        query: {
          matchingId: matching._id,
          to: 'student',
          read: { $exists: false },
          $limit: 0,
        },
      });

      return (matching.unreadStudentLogsCount = total);
    },

    unreadTeacherLogsCount: (...args) => async (matching, context) => {
      const { total } = await context.app.service('matching-logs').find({
        query: {
          matchingId: matching._id,
          to: 'teacher',
          read: { $exists: false },
          $limit: 0,
        },
      });

      return (matching.unreadTeacherLogsCount = total);
    },
  },
};

module.exports = resolvers;

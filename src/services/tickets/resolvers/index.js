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
  },
};

module.exports = resolvers;

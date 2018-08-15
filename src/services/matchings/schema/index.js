const schema = {
  computed: {
    unread: async (matching, context) => {
      const { payload } = context.params;
      const { _id, archivedAt, removedAt } = matching;

      if (archivedAt || removedAt || !payload) {
        return;
      }

      if (!payload.studentId && payload.teacherId) {
        return;
      }

      if (payload.studentId) {
        const result = await context.app.service('matching-logs').find({
          query: {
            matchingId: _id,
            to: 'student',
            read: { $exists: false },
            $limit: 0,
          },
        });

        console.log('unread result', result);
        return result.total;
      }

      if (payload.teacherId) {
        const result = await context.app.service('matching-logs').find({
          query: {
            matchingId: _id,
            to: 'teacher',
            read: { $exists: false },
            $limit: 0,
          },
        });

        console.log('unread result', result);
        return result.total;
      }
    },
  },
};

module.exports = schema;

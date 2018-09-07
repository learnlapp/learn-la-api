const resolvers = {
  joins: {
    student: () => async (ticket, context) => {
      const $select = { password: 0, phone: 0, phoneNumber: 0 };

      return (ticket.student = await context.app
        .service('students')
        .get(ticket.studentId, {
          query: {
            $select,
          },
        }));
    },

    teacher: () => async (ticket, context) => {
      const $select = { password: 0, phone: 0, phoneNumber: 0 };

      return (ticket.student = await context.app
        .service('teachers')
        .get(ticket.teacherId, {
          query: {
            $select,
          },
        }));
    },

    matching: () => async (ticket, context) => {
      return (ticket.matching = await context.app
        .service('matchings')
        .get(ticket.matchingId, {
          query: {
            // $select,
          },
        }));
    },
  },
};

module.exports = resolvers;

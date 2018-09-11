const resolvers = {
  joins: {
    owner: () => async (ticket, context) => {
      let $select = { password: 0 };

      return (ticket.owner = await context.app
        .service(`${ticket.platform}s`)
        .get(ticket.ownerId, {
          query: {
            $select,
          },
        }));
    },

    reference: () => async (ticket, context) => {
      if (!ticket.ref) {
        return null;
      }

      return (ticket.reference = await context.app
        .service(`${ticket.ref}s`)
        .get(ticket.refId, {
          query: {
            // $select,
          },
        }));
    },

    // student: () => async (ticket, context) => {
    //     const $select = { password: 0, phone: 0, phoneNumber: 0 };

    //     return (ticket.student = await context.app
    //       .service('students')
    //       .get(ticket.studentId, {
    //         query: {
    //           $select,
    //         },
    //       }));
    // },

    // teacher: () => async (ticket, context) => {
    //   const $select = { password: 0, phone: 0, phoneNumber: 0 };

    //   return (ticket.student = await context.app
    //     .service('teachers')
    //     .get(ticket.teacherId, {
    //       query: {
    //         $select,
    //       },
    //     }));
    // },

    // matching: () => async (ticket, context) => {
    //   return (ticket.matching = await context.app
    //     .service('matchings')
    //     .get(ticket.matchingId, {
    //       query: {
    //         // $select,
    //       },
    //     }));
    // },
  },
};

module.exports = resolvers;

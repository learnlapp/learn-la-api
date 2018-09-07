const resolvers = {
  joins: {
    student: (contact = false) => async (studentAd, context) => {
      const $select = contact
        ? { password: 0 }
        : { password: 0, phone: 0, phoneNumber: 0 };

      return (studentAd.student = await context.app
        .service('students')
        .get(studentAd.studentId, {
          query: {
            $select,
          },
        }));
    },

    bookmarked: () => async (studentAd, context) => {
      const { user, payload } = context.params;

      if (
        payload &&
        payload.platform === 'student' &&
        user &&
        user.bookmarks &&
        user.bookmarks.filter(id => studentAd._id.equals(id)).length
      ) {
        return (studentAd.bookmarked = true);
      }

      return (studentAd.bookmarked = undefined);
    },
  },
};

module.exports = resolvers;

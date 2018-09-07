const resolvers = {
  joins: {
    teacher: (contact = false) => async (courseAd, context) => {
      const $select = contact
        ? { password: 0 }
        : { password: 0, phone: 0, phoneNumber: 0 };

      return (courseAd.teacher = await context.app
        .service('teachers')
        .get(courseAd.teacherId, {
          query: {
            $select,
          },
        }));
    },

    bookmarked: () => async (courseAd, context) => {
      const { user, payload } = context.params;

      if (
        payload &&
        payload.platform === 'student' &&
        user &&
        user.bookmarks &&
        user.bookmarks.filter(id => courseAd._id.equals(id)).length
      ) {
        return (courseAd.bookmarked = true);
      }

      return (courseAd.bookmarked = undefined);
    },
  },
};

module.exports = resolvers;

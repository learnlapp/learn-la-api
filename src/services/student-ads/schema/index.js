const schema = {
  computed: {
    bookmarked: (courseAd, context) => {
      const { profile } = context.params;

      if (
        profile &&
        profile.bookmarks &&
        profile.bookmarks.filter(id => courseAd._id.equals(id)).length
      ) {
        return true;
      }

      return false;
    },
  },
};

module.exports = schema;

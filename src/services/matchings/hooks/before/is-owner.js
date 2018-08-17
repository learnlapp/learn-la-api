const Forbidden = require('@feathersjs/errors');
module.exports = function isOwner() {
  return async context => {
    const { studentId, teacherId } = context.params.payload;

    if (!studentId && !teacherId) {
      throw new Forbidden();
    }

    let matching = {};
    if (studentId) {
      matching = await context.app.service('matchings').find({
        query: {
          matchingId,
          studentId,
          $limit: 0,
        },
      });
    }

    if (teacherId) {
      matching = await context.app.service('matchings').find({
        query: {
          matchingId,
          teacherId,
          $limit: 0,
        },
      });
    }

    if (matching.total <= 0) {
      throw new Forbidden();
    }

    return context;
  };
};

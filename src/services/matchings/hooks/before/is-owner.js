const { Forbidden, NotFound } = require('@feathersjs/errors');

module.exports = function isOwner() {
  return async context => {
    const { studentId, teacherId } = context.params.payload;

    const matching = await context.app.service('matchings').get(context.id);

    if (!matching) {
      throw new NotFound();
    }

    if (matching.studentId !== studentId) {
      console.log('std');

      throw new Forbidden();
    }

    if (matching.teacherId !== teacherId) {
      console.log('teacher');

      throw new Forbidden();
    }

    return context;
  };
};

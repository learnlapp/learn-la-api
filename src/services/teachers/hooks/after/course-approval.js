const { BadRequest, GeneralError } = require('@feathersjs/errors');

module.exports = function courseApproval() {
  return async context => {
    const { subdocumentId } = context.params;
    const { _id, courses } = context.result;

    if (!subdocumentId) {
      throw new BadRequest('subdocumentId is required.');
    }

    const course = courses.filter(doc => doc._id.equals(subdocumentId))[0];
    const { status, category, title, level } = course;

    switch (status) {
      case 'rejected':
        // send notification
        break;

      case 'approved':
        // save archievement,

        // send notification to teacher
        // console.log('result', context.result);

        // notify student if she requested
        const matchings = await context.app.service('matchings').find({
          query: {
            teacherId: _id,
            // expiredAt - to be considered
            removedAt: { $exists: false },
            archivedAt: { $exists: false },
          },
          paginate: false,
          fastJoinQuery: { student: 0, teacher: 0 },
        });

        if (matchings.length) {
          // Find all matching logs with course requested in the given list.
          matchings.map(async matching => {
            try {
              const matchingLog = await context.app
                .service('matching-logs')
                .find({
                  query: {
                    matchingId: matching._id,
                    from: 'student',
                    logId: 'requestVerificationMsg',
                    'extra.course.category': category,
                    'extra.course.title': title,
                    'extra.course.level': level,
                    $limit: 0,
                  },
                });

              if (matchingLog.total) {
                const res = await context.app.service('matching-logs').create({
                  matchingId: matching._id,
                  from: 'teacher',
                  to: 'student',
                  logId: 'viewVerificationMsg',
                  extra: { type: 'course', course },
                });
              }
            } catch (err) {
              throw new GeneralError(err);
            }
          });
        }
        break;

      default:
        break;
    }

    return context;
  };
};

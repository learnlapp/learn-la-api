const { BadRequest } = require('@feathersjs/errors');

module.exports = function verificationAprroval() {
  return async context => {
    const { documentId } = context.params;
    const { _id, verifications } = context.result;

    if (!documentId) {
      throw new BadRequest('documentId is required.');
    }

    const verification = verifications.filter(doc =>
      doc._id.equals(documentId)
    );
    console.log('verification', verification);

    switch (verification.status) {
      case 'rejected':
        // send notification
        break;

      case 'approved':
        // save archievement,

        // send notification to teacher
        console.log('result', context.result);

        // notify student if she requested
        const matchings = await context.app.serice('matchings').find({
          query: {
            teacherId: _id,
            // expiredAt - to be considered
            removedAt: { $exists: false },
            archivedAt: { $exists: false },
          },
          paginate: false,
          fastJoinQuery: { student: 0, teacher: 0 },
        });
        console.log('matchings', matchings);

        if (matchings.length) {
          // Find all matching logs with verification requested in the given list.
          matchings.map(async mataching => {
            const matchingLog = await context.app
              .service('matching-logs')
              .find({
                query: {
                  matchingId: matching._id,
                  from: 'student',
                  logId: 'requestVerificationMsg',
                  'extra.type': 'id',
                  $limit: 0,
                },
              });

            if (matchingLog.total) {
              context.app.service('matching-logs').create({
                matchingId: matching._id,
                from: 'teacher',
                to: 'student',
                logId: 'viewVerificationMsg',
                extra: { type: 'id' },
              });
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

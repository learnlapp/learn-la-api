const { BadRequest, GeneralError } = require('@feathersjs/errors');

module.exports = function verificationAprroval() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { achievement } = teacherSettings;
    const { subdocumentId } = context.params;
    const { _id, verifications } = context.result;

    if (!subdocumentId) {
      throw new BadRequest('subdocumentId is required.');
    }

    const verification = verifications.filter(doc =>
      doc._id.equals(subdocumentId)
    )[0];
    const { status, type } = verification;

    switch (status) {
      case 'rejected':
        // send notification
        break;

      case 'approved':
        // create achievement,
        context.app.service('achievements').create({
          category: 'verification',
          type,
          ownerType: 'teacher',
          ownerId: _id,
          coin: achievement.verification[type],
        });

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
          // Find all matching logs with verification requested in the given list.
          matchings.map(async matching => {
            try {
              const matchingLog = await context.app
                .service('matching-logs')
                .find({
                  query: {
                    matchingId: matching._id,
                    from: 'student',
                    logId: 'requestVerificationMsg',
                    'extra.type': type,
                    $limit: 0,
                  },
                });

              if (matchingLog.total) {
                const res = await context.app.service('matching-logs').create({
                  matchingId: matching._id,
                  from: 'teacher',
                  to: 'student',
                  logId: 'viewVerificationMsg',
                  extra: { type: 'id' },
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

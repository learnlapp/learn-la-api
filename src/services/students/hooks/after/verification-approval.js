const { BadRequest, GeneralError } = require('@feathersjs/errors');
const { sendNotification } = require('../../../../modules/oneSignal');
const messageList = require('../../../../modules/notification-messages');

module.exports = function verificationAprroval() {
  return async context => {
    const studentSettings = context.app.get('appSettings').student;
    const { achievement } = studentSettings;
    const { subdocumentId } = context.params;
    const { _id, oneSignalIds, verifications } = context.result;

    if (!subdocumentId) {
      throw new BadRequest('subdocumentId is required.');
    }

    const verification = verifications.filter(doc =>
      doc._id.equals(subdocumentId)
    )[0];
    const { status, type } = verification;
    const config = context.app.get('oneSignal').student;

    switch (status) {
      case 'rejected':
        // send notification
        const m_verificationType = type;
        const {
          headings,
          contents,
          data,
        } = messageList.student.verification.rejected;

        sendNotification({
          config,
          targetIds: oneSignalIds,
          headings: JSON.parse(eval(headings)),
          contents: JSON.parse(eval(contents)),
          data: { ...data, id: matchingId },
        });
        break;

      case 'approved':
        // save archievement,
        context.app.service('achievements').create({
          category: 'verification',
          type,
          ownerType: 'student',
          ownerId: _id,
          coin: achievement.verification[type],
        });
        // send notification to teacher
        // console.log('result', context.result);

        // notify student if she requested
        const matchings = await context.app.service('matchings').find({
          query: {
            studentId: _id,
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
                    from: 'teacher',
                    logId: 'requestVerificationMsg',
                    'extra.type': type,
                    $limit: 0,
                  },
                });

              if (matchingLog.total) {
                const res = await context.app.service('matching-logs').create({
                  matchingId: matching._id,
                  from: 'student',
                  to: 'teacher',
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

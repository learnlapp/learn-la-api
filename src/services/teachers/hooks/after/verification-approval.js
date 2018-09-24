const { BadRequest, GeneralError } = require('@feathersjs/errors');
const { sendNotification } = require('../../../../modules/oneSignal');
const messageList = require('../../../../modules/notification-messages');
const verificationTypes = require('../../../../modules/verification-types');

module.exports = function verificationAprroval() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { achievement } = teacherSettings;
    const { subdocumentId } = context.params;
    const { _id, oneSignalIds, verifications } = context.result;

    if (!subdocumentId) {
      throw new BadRequest('subdocumentId is required.');
    }

    const verification = verifications.filter(doc =>
      doc._id.equals(subdocumentId)
    )[0];
    const { status, type } = verification;
    const config = context.app.get('oneSignal').teacher;
    const m_verificationType = verificationTypes[type];
    const message = messageList.teacher.verification;

    switch (status) {
      case 'rejected':
        // send notification
        sendNotification({
          config,
          targetIds: oneSignalIds,
          headings: JSON.parse(eval(message.rejected.headings)),
          contents: JSON.parse(eval(message.rejected.contents)),
          data: { ...message.rejected.data },
        });
        break;

      case 'approved':
        // send notification
        sendNotification({
          config,
          targetIds: oneSignalIds,
          headings: JSON.parse(eval(message.approved.headings)),
          contents: JSON.parse(eval(message.approved.contents)),
          data: { ...message.approved.data },
        });

        // create achievement,
        context.app.service('achievements').create({
          category: 'verification',
          type,
          ownerType: 'teacher',
          ownerId: _id,
          coin: achievement.verification[type],
        });
        // send notification to teacher

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
                  extra: { type },
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

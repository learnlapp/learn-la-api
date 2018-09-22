const { BadRequest, GeneralError } = require('@feathersjs/errors');
const { sendNotification } = require('../../../../modules/oneSignal');
const messageList = require('../../../../modules/notification-messages');

module.exports = function courseApproval() {
  return async context => {
    const teacherSettings = context.app.get('appSettings').teacher;
    const { achievement } = teacherSettings;
    const { subdocumentId } = context.params;
    const { _id, courses, oneSignalIds } = context.result;

    if (!subdocumentId) {
      throw new BadRequest('subdocumentId is required.');
    }

    const course = courses.filter(doc => doc._id.equals(subdocumentId))[0];
    const { status, category, title, level } = course;
    const config = context.app.get('oneSignal').teacher;

    switch (status) {
      case 'rejected':
        // send notification
        const m_verificationType = category + title + level;
        const {
          headings,
          contents,
          data,
        } = messageList.teacher.verification.rejected;

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
          type: 'course',
          ownerType: 'teacher',
          ownerId: _id,
          coin: achievement.verification.course,
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

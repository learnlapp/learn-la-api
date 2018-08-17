const BadRequest = require('@feathersjs/errors');

module.exports = function setLogsAsRead() {
  return async context => {
    const { to } = context.data;

    if (!to) {
      throw new BadRequest(`field 'to' is required`);
    }

    const readLogs = await context.app.service('matching-logs').patch(
      null,
      { read: new Date() },
      {
        query: {
          matchingId: context.id,
          to,
          read: { $exists: false },
        },
        // paginate: false,
      }
    );
    console.log('readLogs', readLogs);

    console.log('----------------');

    context.result = readLogs;
    return context;
  };
};

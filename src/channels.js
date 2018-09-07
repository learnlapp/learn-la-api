module.exports = function(app) {
  if (typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
  });

  app.on('login', async (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      app.channel('anonymous').leave(connection);
      app.channel('authenticated').join(connection);

      const { payload } = connection;
      // Student App
      if (payload && payload.studentId) {
        app.channel('student').join(connection);
        app.channel(`student/${payload.studentId}`).join(connection);
        try {
          const matchings = await app.service('matchings').find({
            query: {
              studentId: payload.studentId,
              archivedAt: { $exists: false },
              removedAt: { $exists: false },
            },
            fastJoinQuery: {
              student: false,
              teacher: false,
              unreadStudentLogsCount: false,
              unreadTeacherLogsCount: false,
            },
            paginate: false,
          });

          if (matchings.length) {
            matchings.map(matching => {
              app.channel(`matching/${matching._id}/student`).join(connection);
            });
          }
        } catch (err) {
          console.log('channel: fetch matchings error: ', err);
        }
      }

      // Teacher App
      if (payload && payload.teacherId) {
        app.channel('teacher').join(connection);
        app.channel(`teacher/${payload.teacherId}`).join(connection);

        try {
          const matchings = await app.service('matchings').find({
            query: {
              teacherId: payload.teacherId,
              archivedAt: { $exists: false },
              removedAt: { $exists: false },
            },
            fastJoinQuery: {
              student: false,
              teacher: false,
              unreadStudentLogsCount: false,
              unreadTeacherLogsCount: false,
            },
            paginate: false,
          });

          if (matchings.length) {
            matchings.map(matching => {
              app.channel(`matching/${matching._id}/teacher`).join(connection);
            });
          }
        } catch (err) {
          console.log('channel: fetch matchings error: ', err);
        }
      }
    }
  });

  app.service('matchings').on('created', (data, context) => {
    const studentConnections = app.channel(`student/${data.studentId}`)
      .connections;
    const teacherConnections = app.channel(`teacher/${data.teacherId}`)
      .connections;

    studentConnections.map(connection =>
      app.channel(`matching/${data._id}/student`).join(connection)
    );

    teacherConnections.map(connection =>
      app.channel(`matching/${data._id}/teacher`).join(connection)
    );
  });

  // ======
  // Publish Events
  // ======
  app.service('matchings').publish('patched', (data, context) => {
    return [
      app.channel(`student/${data.studentId}`),
      app.channel(`teacher/${data.teacherId}`),
    ];
  });

  app.service('matching-logs').publish('created', (data, context) => {
    return [app.channel(`matching/${data.matchingId}/${data.to}`)];
  });
};

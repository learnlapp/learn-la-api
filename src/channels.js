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
            query: { studentId: payload.studentId },
            fastJoinQuery: { student: false, teacher: false, unread: false },
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
            query: { teacherId: payload.teacherId },
            fastJoinQuery: { student: false, teacher: false, unread: false },
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
      // console.log('ch con', app.channels);
      // console.log('all channels', app.channels.length);
    }
  });

  app.service('matchings').on('created', (data, context) => {
    console.log('channel on matching createed', context.params.connection);
    // const { connections } = app.channel(app.channels).filter(connection =>
    //   connection.payload.studentId === user._id
    // );

    // app.channel(`matching/${result._id}`).join(context.connection);
    // console.log('all channels after create matchings', app.channels.length);
  });

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
// eslint-disable-next-line no-unused-vars
// app.publish((data, hook) => {
//   // Here you can add event publishers to channels set up in `channels.js`
//   // To publish only for a specific event use `app.publish(eventname, () => {})`

//   console.log(
//     'Publishing all events to all authenticated users. See `channels.js` and https://docs.feathersjs.com/api/channels.html for more information.'
//   ); // eslint-disable-line

//   // e.g. to publish all service events to all authenticated users use
//   return app.channel('authenticated');
// });

// Here you can also add service specific event publishers
// e.g. the publish the `users` service `created` event to the `admins` channel
// app.service('users').publish('created', () => app.channel('admins'));

// With the userid and email organization from above you can easily select involved users
//   app.service('messages').publish(() => {
//     return [
//       app.channel(`userIds/${data.createdBy}`),
//       app.channel(`emails/${data.recipientEmail}`)
//     ];
//   });
// };

// // Join a channel given a user and connection
// const joinChannels = (user, connection) => {
//   app.channel('authenticated').join(connection);
//   // Assuming that the chat room/user assignment is stored
//   // on an array of the user
//   user.rooms.forEach(room =>
//     app.channel(`rooms/${roomId}`).join(connection)
//   );
// }

// // Get a user to leave all channels
// const leaveChannels = user => {
//   app.channel(app.channels).leave(connection =>
//     connection.user._id === user._id
//   );
// };

// // Leave and re-join all channels with new user information
// const updateChannels = user => {
//   // Find all connections for this user
//   const { connections } = app.channel(app.channels).filter(connection =>
//     connection.user._id === user._id
//   );

//   // Leave all channels
//   leaveChannels(user);

//   // Re-join all channels with the updated user information
//   connections.forEach(connection => joinChannels(user, connection));
// }

// app.on('login', (payload, { connection }) => {
//   if(connection) {
//     // Join all channels on login
//     joinChannels(connection.user, connection);
//   }
// });

// // On `updated` and `patched`, leave and re-join with new room assignments
// app.service('users').on('updated', updateChannels);
// app.service('users').on('patched', updateChannels);
// // On `removed`, remove the connection from all channels
// app.service('users').on('removed', leaveChannels);

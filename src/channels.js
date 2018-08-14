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

      try {
        // Student App
        if (payload && payload.studentId) {
          app.channel('student').join(connection);
          app.channel(`student/${payload.studentId}`).join(connection);

          const matchings = await app.service('matchings').find({
            query: { studentId: payload.studentId },
            paginate: false,
          });
          // console.log('matchings', matchings);

          if (matchings.length) {
            matchings.map(matching =>
              app.channel(`matching/${matching._id}`).join(connection)
            );
          }
        }

        // Teacher App
        if (payload && payload.teacherId) {
          app.channel('teacher').join(connection);
          app.channel(`teacher/${payload.teacherId}`).join(connection);

          const matchings = await app.service('matchings').find({
            query: { teacherId: payload.teacherId },
            paginate: false,
          });

          if (matchings.length) {
            matchings.map(matching =>
              app.channel(`matching/${matching._id}`).join(connection)
            );
          }
        }
      } catch (err) {
        console.log('err', err);

        throw err;
      }

      console.log('all channels', app.channels);

      // Channels can be named anything and joined on any condition

      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));

      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });

  app.service('matchings').on('created', (data, context) => {});

  app.service('matchings').publish('created', (data, context) => {
    console.log('data', data);
    console.log('context', context.params.connection);
    return [
      app.channel(`student/${data.studentId}`),
      app.channel(`teacher/${data.teacherId}`),
    ];
  });

  // // eslint-disable-next-line no-unused-vars
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

  //
  //

  //

  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};

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

const axios = require('axios');
const { BadRequest } = require('@feathersjs/errors');
const messageList = require('./message-list');

module.exports = function(app) {
  // const { student, teacher } = app.get('oneSignal');

  // const sendToStudent = (params = {}) => {
  //   const { name, targetIds, headings, contents, data } = params;
  //   // const { headings, contents } = message;

  //   return axios({
  //     method: 'POST',
  //     url: 'https://onesignal.com/api/v1/notifications',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Basic ${student.apiKey}`,
  //     },
  //     data: {
  //       app_id: student.appId,
  //       data,
  //       headings,
  //       contents,
  //       content_available: true,
  //       mutable_content: true,
  //       include_player_ids: targetIds,
  //       ios_badgeType: 'Increase',
  //       ios_badgeCount: 1,
  //     },
  //   });
  // };

  // const sendToTeacher = (params = {}) => {
  //   const { targetIds, headings, contents, data } = params;
  //   if (!targetIds) {
  //     throw new BadRequest('targetIds is required.');
  //   }

  //   if (!Array.isArray(targetIds)) {
  //     throw new BadRequest('targetIds must be an array ofoneSignal player_id.');
  //   }

  //   if (!headings || !contents) {
  //     throw new BadRequest('headings and contents are required.');
  //   }

  //   if (typeof headings !== 'object') {
  //     throw new BadRequest('headings must be an object.');
  //   }

  //   if (typeof contents !== 'object') {
  //     throw new BadRequest('contents must be an object.');
  //   }

  //   return axios({
  //     method: 'POST',
  //     url: 'https://onesignal.com/api/v1/notifications',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Basic ${teacher.apiKey}`,
  //     },
  //     data: {
  //       app_id: teacher.appId,
  //       data,
  //       headings,
  //       contents,
  //       content_available: true,
  //       mutable_content: true,
  //       include_player_ids: targetIds,
  //       ios_badgeType: 'Increase',
  //       ios_badgeCount: 1,
  //     },
  //   });
  // };

  const sendNotification = (params = {}) => {
    const oneSignalConfig = app.get('oneSignal');
    const { platform, targetIds, headings, contents, data } = params;
    console.log('targetIds', targetIds);

    console.log('platform', platform);
    console.log('headings', headings);
    console.log('contents', contents);
    console.log('data', data);
    console.log('oneSignalConfig', oneSignalConfig[platform]);
    console.log('apiKey', oneSignalConfig[platform].apiKey);
    console.log('appId', oneSignalConfig[platform].appId);

    if (platform !== 'student' && platform !== 'teacher') {
      throw new BadRequest('invalid platform.');
    }

    if (!targetIds) {
      throw new BadRequest('targetIds is required.');
    }

    if (!Array.isArray(targetIds)) {
      throw new BadRequest('targetIds must be an array ofoneSignal player_id.');
    }

    if (!headings || !contents) {
      throw new BadRequest('headings and contents are required.');
    }

    if (typeof headings !== 'object') {
      throw new BadRequest('headings must be an object.');
    }

    if (typeof contents !== 'object') {
      throw new BadRequest('contents must be an object.');
    }

    return axios({
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${oneSignalConfig[platform].apiKey}`,
      },
      data: {
        app_id: oneSignalConfig[platform].appId,
        data,
        headings,
        contents,
        content_available: true,
        mutable_content: true,
        include_player_ids: targetIds,
        ios_badgeType: 'Increase',
        ios_badgeCount: 1,
      },
    });
  };

  const oneSignalClient = { sendNotification, messageList };

  app.set('oneSignalClient', oneSignalClient);
};

// const headers = {
//   'Content-Type': 'application/json',
//   Authorization: `Basic ${ONESIGNAL.KEY}`,
// };

// const send => (params = {})  => (config) => {
//   const headers = {
//     'Content-Type': 'application/json',
//     Authorization: `Basic ${config.apiKey}`,
//   };

//   return axios({
//     method: 'POST',
//     url: 'https://onesignal.com/api/v1/notifications',
//     headers,
//     data: {
//       app_id: ONESIGNAL.APP_ID,
//       data,
//       headings,
//       contents,
//       content_available: true,
//       mutable_content: true,
//       include_player_ids: [target],
//       ios_badgeType: 'Increase',
//       ios_badgeCount: 1,
//     },
//   });
// }

// function send(target = null, contents, headings = null, data = {}) {
//   return axios({
//     method: 'POST',
//     url: 'https://onesignal.com/api/v1/notifications',
//     headers,
//     data: {
//       app_id: ONESIGNAL.APP_ID,
//       data,
//       headings,
//       contents,
//       content_available: true,
//       mutable_content: true,
//       include_player_ids: [target],
//       ios_badgeType: 'Increase',
//       ios_badgeCount: 1,
//     },
//   });
// }

// function welcome(target, name) {
//   const contents = {
//     en: `${name}, welcome to MeeUp!`,
//   };

//   return send(target, contents);
// }

// function welcomeTalent(target, name) {
//   const contents = {
//     en: `${name}, you become a meeUp's talent!`,
//   };

//   return send(target, contents);
// }

// function requestConnect(target, senderName, attachment) {
//   const contents = {
//     en: `${senderName} would like to setup a lesson with You!`,
//   };

//   return send(target, contents, null, attachment);
// }

// function acceptConnect(target, senderName, attachment) {
//   const contents = {
//     en: `${senderName} accepted your connection request!`,
//   };

//   return send(target, contents, null, attachment);
// }

// function declineConnect(target, senderName, attachment) {
//   const contents = {
//     en: `${senderName} declined your connection request!`,
//   };

//   return send(target, contents, null, attachment);
// }

// function chatMessage(target, senderName, message, attachment) {
//   const heading = { en: senderName };
//   const content = { en: message };

//   return send(target, content, heading, attachment);
// }

// function acceptLesson(target, senderName, attachment) {
//   const contents = {
//     en: `${senderName} has accepted your lesson!`,
//   };

//   return send(target, contents, null, attachment);
// }

// function declineLesson(target, senderName, attachment) {
//   const contents = {
//     en: `${senderName} has declined your lesson!`,
//   };

//   return send(target, contents, null, attachment);
// }

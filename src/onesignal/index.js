const axios = require('axios');

module.exports = function(app) {
  const { student, teacher } = app.get('oneSignal');
  const twillioClient = authy(apiKey);

  app.set('twillioClient', twillioClient);
};

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Basic ${ONESIGNAL.KEY}`,
};

function send(target = null, contents, headings = null, data = {}) {
  return axios({
    method: 'POST',
    url: 'https://onesignal.com/api/v1/notifications',
    headers,
    data: {
      app_id: ONESIGNAL.APP_ID,
      data,
      headings,
      contents,
      content_available: true,
      mutable_content: true,
      include_player_ids: [target],
      ios_badgeType: 'Increase',
      ios_badgeCount: 1,
    },
  });
}

function welcome(target, name) {
  const contents = {
    en: `${name}, welcome to MeeUp!`,
  };

  return send(target, contents);
}

function welcomeTalent(target, name) {
  const contents = {
    en: `${name}, you become a meeUp's talent!`,
  };

  return send(target, contents);
}

function requestConnect(target, senderName, attachment) {
  const contents = {
    en: `${senderName} would like to setup a lesson with You!`,
  };

  return send(target, contents, null, attachment);
}

function acceptConnect(target, senderName, attachment) {
  const contents = {
    en: `${senderName} accepted your connection request!`,
  };

  return send(target, contents, null, attachment);
}

function declineConnect(target, senderName, attachment) {
  const contents = {
    en: `${senderName} declined your connection request!`,
  };

  return send(target, contents, null, attachment);
}

function chatMessage(target, senderName, message, attachment) {
  const heading = { en: senderName };
  const content = { en: message };

  return send(target, content, heading, attachment);
}

function acceptLesson(target, senderName, attachment) {
  const contents = {
    en: `${senderName} has accepted your lesson!`,
  };

  return send(target, contents, null, attachment);
}

function declineLesson(target, senderName, attachment) {
  const contents = {
    en: `${senderName} has declined your lesson!`,
  };

  return send(target, contents, null, attachment);
}

const axios = require('axios');
const { BadRequest } = require('@feathersjs/errors');
const messageList = require('./message-list');

module.exports = function(app) {
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

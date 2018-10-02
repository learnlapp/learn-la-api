const axios = require('axios');
const { BadRequest } = require('@feathersjs/errors');

module.exports = {
  sendNotification,
};

async function sendNotification(params = {}) {
  try {
    const { config, targetIds, headings, contents, data } = params;

    if (!config) {
      throw new Error('config is required.');
    }

    if (!targetIds) {
      throw new Error('targetIds is required.');
    }

    if (!Array.isArray(targetIds)) {
      throw new Error('targetIds must be an array ofoneSignal player_id.');
    }

    if (!headings || !contents) {
      throw new Error('headings and contents are required.');
    }

    if (typeof headings !== 'object') {
      throw new Error('headings must be an object.');
    }

    if (typeof contents !== 'object') {
      throw new Error('contents must be an object.');
    }

    const response = await axios({
      method: 'POST',
      url: 'https://onesignal.com/api/v1/notifications',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${config.apiKey}`,
      },
      data: {
        app_id: config.appId,
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

    return response;
  } catch (err) {
    return new BadRequest(err);
  }
}

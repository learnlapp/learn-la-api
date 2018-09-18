const _queryWithCurrentUser = require('./_query-with-current-user');
const _restrictToOwner = require('./_restrict-to-owner');
const isAction = require('./is-action');
const isAuthenticated = require('./is-authenticated');
const isPlatform = require('./is-platform');
const isSettingOnline = require('./is-setting-online');
const log = require('./log');
const refreshParamsEntity = require('./refresh-params-entity');
const setExpiredAfter = require('./set-expired-after');
const setFastJoinQuery = require('./set-fast-join-query');

module.exports = {
  _queryWithCurrentUser,
  _restrictToOwner,
  isAction,
  isAuthenticated,
  isPlatform,
  isSettingOnline,
  log,
  refreshParamsEntity,
  setExpiredAfter,
  setFastJoinQuery,
};

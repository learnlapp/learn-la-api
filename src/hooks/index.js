const isAction = require('./is-action');
const isAuthenticated = require('./is-authenticated');
const isPlatform = require('./is-platform');
const log = require('./log');
const refreshParamsEntity = require('./refresh-params-entity');
const setExpiredAfter = require('./set-expired-after');
const setFastJoinQuery = require('./set-fast-join-query');

module.exports = {
  isAction,
  isAuthenticated,
  isPlatform,
  log,
  refreshParamsEntity,
  setExpiredAfter,
  setFastJoinQuery,
};

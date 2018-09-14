const associateRelevantIds = require('./associate-relevant-ids');
const chargeCoinsForMatching = require('./charge-coins-for-matching');
const hasEnoughCoins = require('./has-enough-coins');
const isOwner = require('./is-owner');
const exchangePhoneCheck = require('./exchange-phone-check');

module.exports = {
  associateRelevantIds,
  chargeCoinsForMatching,
  hasEnoughCoins,
  isOwner,
  exchangePhoneCheck,
};

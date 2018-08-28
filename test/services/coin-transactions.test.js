const assert = require('assert');
const app = require('../../src/app');

describe('\'coinTransactions\' service', () => {
  it('registered the service', () => {
    const service = app.service('coin-transactions');

    assert.ok(service, 'Registered the service');
  });
});

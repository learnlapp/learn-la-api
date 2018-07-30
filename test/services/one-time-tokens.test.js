const assert = require('assert');
const app = require('../../src/app');

describe('\'oneTimeTokens\' service', () => {
  it('registered the service', () => {
    const service = app.service('one-time-tokens');

    assert.ok(service, 'Registered the service');
  });
});

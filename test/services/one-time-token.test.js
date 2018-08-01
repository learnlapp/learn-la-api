const assert = require('assert');
const app = require('../../src/app');

describe('\'oneTimeToken\' service', () => {
  it('registered the service', () => {
    const service = app.service('one-time-token');

    assert.ok(service, 'Registered the service');
  });
});

const assert = require('assert');
const app = require('../../src/app');

describe('\'matchingLogs\' service', () => {
  it('registered the service', () => {
    const service = app.service('matching-logs');

    assert.ok(service, 'Registered the service');
  });
});

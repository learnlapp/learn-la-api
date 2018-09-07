const assert = require('assert');
const app = require('../../src/app');

describe('\'matchings\' service', () => {
  it('registered the service', () => {
    const service = app.service('matchings');

    assert.ok(service, 'Registered the service');
  });
});

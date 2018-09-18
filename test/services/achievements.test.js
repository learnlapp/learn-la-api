const assert = require('assert');
const app = require('../../src/app');

describe('\'achievements\' service', () => {
  it('registered the service', () => {
    const service = app.service('achievements');

    assert.ok(service, 'Registered the service');
  });
});

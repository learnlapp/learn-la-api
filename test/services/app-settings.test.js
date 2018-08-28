const assert = require('assert');
const app = require('../../src/app');

describe('\'appSettings\' service', () => {
  it('registered the service', () => {
    const service = app.service('app-settings');

    assert.ok(service, 'Registered the service');
  });
});

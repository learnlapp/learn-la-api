const assert = require('assert');
const app = require('../../src/app');

describe('\'media-trash\' service', () => {
  it('registered the service', () => {
    const service = app.service('media-trash');

    assert.ok(service, 'Registered the service');
  });
});

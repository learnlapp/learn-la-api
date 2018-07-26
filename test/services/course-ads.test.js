const assert = require('assert');
const app = require('../../src/app');

describe('\'courseAds\' service', () => {
  it('registered the service', () => {
    const service = app.service('course-ads');

    assert.ok(service, 'Registered the service');
  });
});

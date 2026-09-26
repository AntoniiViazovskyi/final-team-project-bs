import assert from 'node:assert/strict';
import test from 'node:test';

process.env.NODE_ENV = 'test';
process.env.MONGO_URL = 'mongodb://127.0.0.1:27017/test';

const { app } = await import('../server.js');
const { Location } = await import('../models/location.js');

test('GET /api/feedbacks returns paginated feedbacks for a location', async () => {
  const originalFindById = Location.findById;
  const locationId = '507f1f77bcf86cd799439011';
  const allFeedbacks = [
    { _id: '1', userName: 'Anna', rate: 5, description: 'Perfect stay' },
    { _id: '2', userName: 'Bohdan', rate: 4, description: 'Nice place' },
    { _id: '3', userName: 'Maria', rate: 5, description: 'Loved the view' },
  ];

  Location.findById = (id) => {
    assert.equal(id, locationId);

    return {
      populate: async () => ({
        _id: id,
        feedbacksId: allFeedbacks,
      }),
    };
  };

  const server = app.listen(0);

  try {
    const { port } = server.address();
    const response = await fetch(
      `http://127.0.0.1:${port}/api/feedbacks?locationId=${locationId}&page=1&limit=2`,
    );

    assert.equal(response.status, 200);

    const body = await response.json();

    assert.equal(body.page, 1);
    assert.equal(body.limit, 2);
    assert.equal(body.total, 3);
    assert.equal(body.data.length, 2);
    assert.equal(body.data[0].userName, 'Anna');
    assert.equal(body.data[1].userName, 'Bohdan');
  } finally {
    server.close();
    Location.findById = originalFindById;
  }
});

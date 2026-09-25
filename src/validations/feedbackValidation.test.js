import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Segments } from 'celebrate';

import { createFeedbackSchema } from './feedbackValidation.js';

const schema = createFeedbackSchema[Segments.BODY];
const validPayload = {
  locationId: '507f1f77bcf86cd799439011',
  rate: 5,
  description: 'Гарне місце для відпочинку',
};

const validate = (overrides = {}) =>
  schema.validate({ ...validPayload, ...overrides });

describe('createFeedbackSchema', () => {
  it('accepts valid boundary values', () => {
    assert.equal(validate({ rate: 1, description: 'a' }).error, undefined);
    assert.equal(validate({ rate: 2.5 }).error, undefined);
    assert.equal(
      validate({ rate: 5, description: 'a'.repeat(200) }).error,
      undefined,
    );
  });

  it('requires a valid locationId', () => {
    const withoutLocationId = {
      rate: validPayload.rate,
      description: validPayload.description,
    };

    assert.ok(schema.validate(withoutLocationId).error);
    assert.ok(validate({ locationId: 'not-an-object-id' }).error);
    assert.ok(validate({ locationId: '507f1f77bcf86cd79943901g' }).error);
  });

  it('requires rate to be a number from 1 to 5', () => {
    assert.ok(validate({ rate: undefined }).error);
    assert.ok(validate({ rate: 0 }).error);
    assert.ok(validate({ rate: 6 }).error);
    assert.ok(validate({ rate: '5' }).error);
  });

  it('requires description to contain from 1 to 200 characters', () => {
    assert.ok(validate({ description: undefined }).error);
    assert.ok(validate({ description: '' }).error);
    assert.ok(validate({ description: 'a'.repeat(201) }).error);
  });

  it('rejects author and moderation fields from the request body', () => {
    assert.ok(validate({ userName: 'Client supplied name' }).error);
    assert.ok(validate({ userId: '507f1f77bcf86cd799439012' }).error);
    assert.ok(validate({ status: 'approved' }).error);
  });
});

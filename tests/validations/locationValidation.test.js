import assert from 'node:assert/strict';
import { describe, it } from 'node:test';

import { Segments } from 'celebrate';

import {
  createLocationSchema,
  updateLocationSchema,
} from '../../src/validations/locationValidation.js';

const createBody = createLocationSchema[Segments.BODY];
const updateBody = updateLocationSchema[Segments.BODY];

const validLocation = {
  name: 'Гірський курорт Буковель',
  description: 'Найвідоміший гірськолижний курорт України',
  locationType: 'recreation',
  region: 'lviv',
  image: 'https://example.com/image.jpg',
  advantages: ['Парковка', 'Wi-Fi'],
  coordinates: { lat: 49.0977, lon: 23.4567 },
};

describe('createLocationSchema', () => {
  it('accepts a valid location', () => {
    assert.equal(createBody.validate(validLocation).error, undefined);
  });

  it('accepts a location without optional fields', () => {
    const minimal = {
      name: validLocation.name,
      description: validLocation.description,
      locationType: validLocation.locationType,
      region: validLocation.region,
      image: validLocation.image,
    };

    assert.equal(createBody.validate(minimal).error, undefined);
  });

  it('requires name, description, locationType, region and image', () => {
    const requiredFields = [
      'name',
      'description',
      'locationType',
      'region',
      'image',
    ];

    for (const field of requiredFields) {
      const payload = { ...validLocation };
      delete payload[field];

      assert.ok(createBody.validate(payload).error, `missing ${field}`);
    }
  });

  it('requires name to contain from 3 to 96 characters', () => {
    assert.ok(createBody.validate({ ...validLocation, name: 'ab' }).error);
    assert.equal(
      createBody.validate({ ...validLocation, name: 'abc' }).error,
      undefined,
    );
    assert.ok(
      createBody.validate({ ...validLocation, name: 'a'.repeat(97) }).error,
    );
    assert.equal(
      createBody.validate({ ...validLocation, name: 'a'.repeat(96) }).error,
      undefined,
    );
    assert.ok(createBody.validate({ ...validLocation, name: '   ' }).error);
  });

  it('requires description to contain from 20 to 6000 characters', () => {
    assert.ok(
      createBody.validate({ ...validLocation, description: 'a'.repeat(19) })
        .error,
    );
    assert.equal(
      createBody.validate({ ...validLocation, description: 'a'.repeat(20) })
        .error,
      undefined,
    );
    assert.ok(
      createBody.validate({ ...validLocation, description: 'a'.repeat(6001) })
        .error,
    );
    assert.equal(
      createBody.validate({ ...validLocation, description: 'a'.repeat(6000) })
        .error,
      undefined,
    );
  });

  it('requires locationType and region to be at most 64 characters', () => {
    assert.ok(
      createBody.validate({
        ...validLocation,
        locationType: 'a'.repeat(65),
      }).error,
    );
    assert.ok(
      createBody.validate({ ...validLocation, region: 'a'.repeat(65) }).error,
    );
    assert.equal(
      createBody.validate({
        ...validLocation,
        locationType: 'a'.repeat(64),
        region: 'a'.repeat(64),
      }).error,
      undefined,
    );
  });

  it('rejects an empty image', () => {
    assert.ok(createBody.validate({ ...validLocation, image: '' }).error);
  });

  it('requires image to be an http(s) url when provided', () => {
    assert.ok(
      createBody.validate({ ...validLocation, image: 'not-a-url' }).error,
    );
    assert.ok(
      createBody.validate({ ...validLocation, image: 'javascript:alert(1)' })
        .error,
    );
  });

  it('requires coordinates to be inside the valid ranges', () => {
    assert.ok(
      createBody.validate({
        ...validLocation,
        coordinates: { lat: 91, lon: 0 },
      }).error,
    );
    assert.ok(
      createBody.validate({
        ...validLocation,
        coordinates: { lat: 0, lon: -181 },
      }).error,
    );
    assert.ok(
      createBody.validate({ ...validLocation, coordinates: { lat: 49 } }).error,
    );
    assert.ok(createBody.validate({ ...validLocation, coordinates: {} }).error);
  });

  it('requires advantages to be an array of non-empty strings', () => {
    assert.ok(
      createBody.validate({ ...validLocation, advantages: 'Парковка' }).error,
    );
    assert.ok(
      createBody.validate({ ...validLocation, advantages: [''] }).error,
    );
    assert.ok(
      createBody.validate({ ...validLocation, advantages: [1, 2] }).error,
    );
    assert.ok(
      createBody.validate({
        ...validLocation,
        advantages: Array.from({ length: 21 }, (_, i) => `advantage ${i}`),
      }).error,
    );
  });

  it('rejects owner, rating and feedback fields from the request body', () => {
    assert.ok(
      createBody.validate({
        ...validLocation,
        ownerId: '507f1f77bcf86cd799439011',
      }).error,
    );
    assert.ok(createBody.validate({ ...validLocation, rate: 5 }).error);
    assert.ok(
      createBody.validate({
        ...validLocation,
        feedbacksId: ['507f1f77bcf86cd799439011'],
      }).error,
    );
    assert.ok(createBody.validate({ ...validLocation, _id: 'anything' }).error);
  });
});

describe('updateLocationSchema', () => {
  it('accepts a single changed field', () => {
    assert.equal(
      updateBody.validate({ name: 'Нова назва локації' }).error,
      undefined,
    );
    assert.equal(updateBody.validate(validLocation).error, undefined);
  });

  it('requires at least one field to update', () => {
    assert.ok(updateBody.validate({}).error);
  });

  it('applies the same field rules as creation', () => {
    assert.ok(updateBody.validate({ name: 'ab' }).error);
    assert.ok(updateBody.validate({ description: 'a'.repeat(19) }).error);
    assert.ok(updateBody.validate({ locationType: 'a'.repeat(65) }).error);
    assert.ok(updateBody.validate({ region: 'a'.repeat(65) }).error);
    assert.ok(updateBody.validate({ image: 'not-a-url' }).error);
    assert.ok(updateBody.validate({ image: '' }).error);
    assert.ok(updateBody.validate({ coordinates: { lat: 91 } }).error);
    assert.ok(updateBody.validate({ advantages: [1] }).error);
  });

  it('rejects owner, rating, feedback and id fields', () => {
    assert.ok(
      updateBody.validate({
        ownerId: '507f1f77bcf86cd799439011',
      }).error,
    );
    assert.ok(updateBody.validate({ rate: 5 }).error);
    assert.ok(updateBody.validate({ feedbacksId: [] }).error);
    assert.ok(updateBody.validate({ _id: 'anything' }).error);
  });
});

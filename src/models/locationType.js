import { model, Schema } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    type: String,
    slug: String,
    shortDescription: String,
  },
  { versionKey: false, collection: 'location_types' },
);

export const LocationType = model('LocationType', locationTypeSchema);

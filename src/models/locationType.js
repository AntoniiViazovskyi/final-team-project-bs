import { model, Schema } from 'mongoose';

const locationTypeSchema = new Schema(
  {
    type: {type: String},
    slug:{type: String},
    shortDescription: {type: String},
  },
  { versionKey: false, collection: 'location_types' },
);

export const LocationType = model('LocationType', locationTypeSchema);

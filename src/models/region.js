import { model, Schema } from 'mongoose';

const regionSchema = new Schema(
  {
    region: String,
    slug: String,
    level: String,
    note: String,
  },
  { versionKey: false },
);

export const Region = model('Region', regionSchema);

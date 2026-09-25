import { model, Schema } from 'mongoose';

const feedbackSchema = new Schema(
  {
    rate: Number,
    description: String,
    userName: String,
  },
  { versionKey: false },
);

export const Feedback = model('Feedback', feedbackSchema);

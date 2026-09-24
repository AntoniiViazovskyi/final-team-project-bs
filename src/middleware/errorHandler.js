import { HttpError } from 'http-errors';
import { MongooseError } from 'mongoose';
import multer from 'multer';

export const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err instanceof HttpError) {
    return res.status(err.status).json({
      message: err.message || err.name,
    });
  }

  const isMongooseError =
    err instanceof MongooseError.ValidationError ||
    err instanceof MongooseError.CastError;

  if (isMongooseError) {
    return res.status(400).json({ message: err.message });
  }

  if (err instanceof multer.MulterError) {
    return res.status(400).json({ message: err.message });
  }

  const isProd = process.env.NODE_ENV === 'production';

  res.status(500).json({
    message: isProd
      ? 'Something went wrong. Please try again later.'
      : err.message,
  });
};

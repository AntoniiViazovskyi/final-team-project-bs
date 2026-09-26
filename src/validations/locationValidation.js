import { Joi, Segments } from 'celebrate';

const locationFields = {
  name: Joi.string().trim().min(2).max(100),
  description: Joi.string().trim().min(1).max(500),
  locationType: Joi.string().trim().min(1).max(100),
  region: Joi.string().trim().min(1).max(100),
  image: Joi.string()
    .uri({ scheme: ['http', 'https'] })
    .max(500)
    .allow(''),
  advantages: Joi.array().items(Joi.string().trim().min(1).max(100)).max(20),
  coordinates: Joi.object({
    lat: Joi.number().min(-90).max(90).required(),
    lon: Joi.number().min(-180).max(180).required(),
  }),
};

export const createLocationSchema = {
  [Segments.BODY]: Joi.object({
    ...locationFields,
    name: locationFields.name.required(),
    description: locationFields.description.required(),
    locationType: locationFields.locationType.required(),
    region: locationFields.region.required(),
    coordinates: locationFields.coordinates.required(),
  }).unknown(false),
};

export const updateLocationSchema = {
  [Segments.BODY]: Joi.object({ ...locationFields })
    .min(1)
    .unknown(false),
};

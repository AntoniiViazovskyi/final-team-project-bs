import { Joi, Segments } from 'celebrate';

export const getAllLocationsSchema = {
  [Segments.QUERY]: Joi.object({
page: Joi.number().integer().min(1).default(1),
limit: Joi.number().integer().min(1).max(50).default(10),
region: Joi.string().trim(),
type: Joi.string().trim(),
search: Joi.string().trim().allow(''),
  })
};


// {
//   _id: ObjectId(...),
//   image: "...",
//   name: "Сонячна Рів'єра",
//   locationType: "more",
//   region: "chornomorske-uzberezhzhya",
//   rate: 4.5,
//   description: "...",
//   coordinates: {
//     lat: 46.0263,
//     lon: 30.4577
//   },
//   ownerId: ObjectId(...),
//   feedbacksId: [...]
// }
// створити ПУБЛІЧНИЙ ендпоінт для ОТРИМАННЯ списку всіх місць
// відпочинку з підтримкою:
// Пагінації (напр., ?page=1&limit=10).
// Фільтрації за регіонами (напр., ?region=id1).
// Фільтрації за типом локації (напр., ?type=id1).
// Пошуку за назвою (напр., ?search=затока)

import { Location } from "../models/location.js";

export const getAllLocations = async (req, res) => {
const {page = 1, limit = 10, region, type, search, rate, sortBy = 'rate',  sortOrder = 'desc'} = req.query;

const skip = (page - 1) * limit;

const locationsQuery = Location.find();

if(region){
  locationsQuery.where('region').equals(region);
};

if(type) {
  locationsQuery.where('locationType').equals(type);
};

if(search){
locationsQuery.where({
  name: {
    $regex: search,
    $options: 'i',
  },
})
};

  if (rate) {
    locationsQuery.where('rate').gte(Number(rate));
  }

const sortDirection = sortOrder === 'asc' ? 1 : -1;

const [totalLocations, locations] = await Promise.all([
  locationsQuery.clone().countDocuments(),
  locationsQuery.clone().sort({[sortBy]: sortDirection}).skip(skip).limit(limit),
]);

const totalPages = Math.ceil(totalLocations / limit);
res.status(200).json({page, limit, totalLocations, totalPages, locations})
};

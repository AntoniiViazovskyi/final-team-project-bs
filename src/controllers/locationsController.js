import { Location } from "../models/location.js";

export const getAllLocations = async (req, res) => {
const {page = 1, limit = 10, region, type,  search} = req.query;

const skip = (page - 1) * limit;

const locationsQuery = Location.find({});

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

const [totalLocations, locations] = await Promise.all([
  locationsQuery.find().clone().countDocuments(),
  locationsQuery.find().skip(skip).limit(limit),
]);

const totalPages = Math.ceil(totalLocations / limit);
res.status(200).json({page, limit, totalLocations, totalPages, locations})
};

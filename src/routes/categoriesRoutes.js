import { Router } from "express";
import { getAllLocationTypes, getAllRegions } from "../controllers/categoriesController.js";


const categoriesRoutes = Router();

categoriesRoutes.get('/regions', getAllRegions);
categoriesRoutes.get('/location_types', getAllLocationTypes)

export default categoriesRoutes;

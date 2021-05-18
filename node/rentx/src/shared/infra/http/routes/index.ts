import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { carsRoutes } from "./cars.routes";
import { categoriesRoutes } from "./categories.routes";
import { sessionRoutes } from "./session.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use('/categories', ensureAuthenticated, categoriesRoutes);
routes.use('/specifications', ensureAuthenticated, specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);
routes.use('/cars', carsRoutes);

export { routes }
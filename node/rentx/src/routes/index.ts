import { Router } from "express";
import { categoriesRoutes } from "./categories.routes";
import { sessionRoutes } from "./session.routes";
import { specificationsRoutes } from "./specifications.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use('/categories', categoriesRoutes);
routes.use('/specifications', specificationsRoutes);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionRoutes);

export { routes }
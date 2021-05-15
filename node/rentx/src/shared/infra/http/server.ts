import "reflect-metadata";
import express from 'express';
import "express-async-errors";
import { routes } from '@shared/infra/http/routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFactory from '../../../docs/swagger';
import "@shared/infra/typeorm/database";
import '@shared/container'
import { handleErrors } from "./middlewares/handleErrors";

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFactory()))

app.use(routes);
app.use(handleErrors);
app.listen(3333, () => console.log('server rodando 🚀'));
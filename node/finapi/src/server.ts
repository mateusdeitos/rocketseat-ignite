import express from 'express';
import { routes } from './routes';
import swaggerUI from 'swagger-ui-express';
import swaggerFactory from './docs/swagger';

const app = express();
app.use(express.json());

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerFactory()))

app.use(routes);

app.listen(3333, () => console.log('server rodando 🚀'));
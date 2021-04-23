import express from 'express';
import { categoriesRoutes } from './routes/categories.routes';

const app = express();
app.use(express.json());

app.use(categoriesRoutes);

app.get('/', (request, response) => {
	return response.json({ message: 'helloooo' })
})
app.post('/courses', (request, response) => {
	return response.json({ message: request.body.name })
})

app.listen(3333, () => console.log('server rodando 🚀'));
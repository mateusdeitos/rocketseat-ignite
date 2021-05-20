import request from "supertest";
import { app } from "@shared/infra/http/server";
import { createUserAdmin } from "@shared/infra/typeorm/seed/admin";
import { Connection, createConnection } from "typeorm";


describe("ListCategoriesController", () => {
	let conn: Connection;
	let token: string;
	let headers = {};
	beforeAll(async () => {
		conn = await createConnection();
		await conn.runMigrations();
		await createUserAdmin(conn, true);
		const { body } = await request(app).post('/sessions').send({
			email: 'admin@rentx.com.br',
			password: 'admin'
		})
		token = body.token;
		headers = { ...headers, Authorization: `Bearer ${token}` }
	});

	afterAll(async () => {
		await conn.dropDatabase();
		await conn.close();
	})


	it('should be able to list all categories', async () => {
		await request(app).post('/categories').set(headers).send({
			name: 'SUV',
			description: 'Carros conversíveis'
		})

		const { body, status } = await request(app).get('/categories').set(headers);

		expect(status).toBe(200);
		expect(body).toEqual(expect.arrayContaining([{
			name: 'SUV',
			description: 'Carros conversíveis',
			created_at: expect.any(String),
			id: expect.any(String),
		}]))
	})
})
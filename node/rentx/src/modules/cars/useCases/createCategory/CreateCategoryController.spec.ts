import request from 'supertest';

import { app } from '@shared/infra/http/server';
import { Connection } from 'typeorm';
import createConnection from '@shared/infra/typeorm/database';
import { createUserAdmin } from '@shared/infra/typeorm/seed/admin';

describe('Create Category Controller', () => {
	let conn: Connection;
	let token: string;
	beforeAll(async () => {
		conn = await createConnection();
		await conn.runMigrations();
		await createUserAdmin(conn, true);
		const { body } = await request(app).post('/sessions').send({
			email: 'admin@rentx.com.br',
			password: 'admin'
		})
		token = body.token;
	});

	afterAll(async () => {
		await conn.dropDatabase();
		await conn.close();
	})

	it('should be able to create a new category', async () => {
		const response = await request(app).post('/categories').set({ Authorization: `Bearer ${token}` }).send({
			name: 'Conversíveis',
			description: 'Carros conversíveis'
		})

		expect(response.status).toBe(201);
	})
	it('should not be able to create a new category when the name already exists', async () => {
		const response = await request(app).post('/categories').set({ Authorization: `Bearer ${token}` }).send({
			name: 'Conversíveis',
			description: 'Carros conversíveis'
		})

		expect(response.status).toBe(400);
		expect(response.body).toHaveProperty("message", expect.stringMatching(new RegExp("category.*exists", "i")))
	})
})
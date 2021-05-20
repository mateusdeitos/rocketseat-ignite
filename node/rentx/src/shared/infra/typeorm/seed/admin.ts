
import { hash } from 'bcrypt';
import createConnection from '../database'
import { v4 } from 'uuid';
import { Connection } from 'typeorm';

export const createUserAdmin = async (_conn?: Connection, keepOpen = false) => {
	const conn = _conn ? _conn : await createConnection();
	const id = v4();
	const password = await hash("admin", 8);
	await conn.query(
		`INSERT INTO users(id, name, email, password, "isAdmin", driver_license) 
		VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, '99999999')`
	);

	if (!keepOpen) {
		await conn.close();
	}
}

createUserAdmin().then(() => console.log('User admin created!'));
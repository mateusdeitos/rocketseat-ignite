
import { hash } from 'bcrypt';
import createConnection from '../database'
import { v4 } from 'uuid';

const create = async () => {
	const conn = await createConnection('localhost');
	const id = v4();
	const password = await hash("admin", 8);
	await conn.query(
		`INSERT INTO users(id, name, email, password, "isAdmin", driver_license) 
		VALUES('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, '99999999')`
	);

	await conn.close();
}

create().then(() => console.log('User admin created!'));
import { Connection, createConnection, getConnectionOptions } from 'typeorm';


export default async function (): Promise<Connection> {
	const defaultOptions = await getConnectionOptions();

	const hostMap = {
		'local': 'localhost',
		'test': 'localhost',
		'container': 'database_main',
	}

	const host = hostMap[process.env.NODE_ENV] || 'database_main';
	return createConnection(Object.assign(defaultOptions, {
		host,
		database: process.env.NODE_ENV === 'test' ? `rentx_testes` : defaultOptions.database,
	}))
}
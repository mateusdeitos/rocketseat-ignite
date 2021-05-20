import { Connection, createConnection, getConnectionOptions } from 'typeorm';


export default async function (host = process.env.NODE_ENV === 'local' ? 'localhost' : 'database_main'): Promise<Connection> {
	const defaultOptions = await getConnectionOptions();

	return createConnection(Object.assign(defaultOptions, {
		host
	}))
}
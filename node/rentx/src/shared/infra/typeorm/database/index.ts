import { Connection, createConnection, getConnectionOptions } from 'typeorm';

interface IOptions {
	host: string;
}

export default async function (host = 'database_main'): Promise<Connection> {
	const defaultOptions = await getConnectionOptions();

	return createConnection(Object.assign(defaultOptions, {
		host
	}))
}
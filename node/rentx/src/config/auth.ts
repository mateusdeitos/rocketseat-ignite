export const authConfig = {
	secret: { 
		token: 'aehehauehuahuae',
		refresh_token: 'kkkkkkkkkkkkk12313113'
	},
	expiresIn: {
		token: '15m',
		refresh_token: {
			jwt: '30d',
			database: 30,
		},
	},
}
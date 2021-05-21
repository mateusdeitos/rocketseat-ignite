export const authenticationSchema = () => ({
	bearerAuth: {
		type: "http",
		scheme: 'bearer',
		bearerFormat: "JWT"
	}
})
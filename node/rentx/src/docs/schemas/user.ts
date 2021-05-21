export const usersSchema = {
	responseBody: (overrideConfig?: Record<string, unknown>) => ({
		type: "object",
		properties: {
			id: { type: "string" },
			name: { type: "string" },
			email: { type: "string" },
			driver_license: { type: "string" },
			isAdmin: { type: "boolean" },
			avatar_url: { type: "string" },
			created_at: { type: "string" },
		},
		example: {
			token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjE1NTQ5MzMsImV4cCI6MTYyMTY0MTMzMywic3ViIjoiZjAwMGQyMjctNjFjZC00MWNkLTg2MzQtZTc0YmVkNDliM2RhIn0.eAg5WBPhs0Lb6KtfyrogLnE0RqOLuF0caq9QCXMVnvw",
			user: {
				id: "f000d227-61cd-41cd-8634-e74bed49b3da",
				name: "Mateus",
				email: "mateus@email.com",
				driver_license: "2138731289",
				isAdmin: false,
				avatar_url: "8b5d4a9ee65f39745852cac3afa56875-8628316.jpg",
				created_at: "2021-05-18T00:39:51.488Z",
			}
		},
		...overrideConfig
	})
}
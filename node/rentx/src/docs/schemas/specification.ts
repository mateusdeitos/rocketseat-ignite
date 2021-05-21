export const specificationsSchema = {
	requestBody: (extendProps?: Record<string, unknown>) => ({
		type: "object",
		properties: {
			name: { type: "string" },
			description: { type: "string" },
			...extendProps
		},
	}),
	responseBody: (extendProps?: Record<string, unknown>) => ({
		type: "array",
		properties: {
			id: { type: "string" },
			name: { type: "string" },
			description: { type: "string" },
			created_at: { type: "string" },
		},
		example: [
			{
				"id": "45a8ead8-3cc0-4035-b92a-a5a92d4c74fe",
				"name": "direcao",
				"description": "hidraulica",
				"created_at": "2021-05-19T00:27:02.735Z"
			},
			{
				"id": "b3bd7d0c-d7c9-43c0-8d25-0dd4384f5640",
				"name": "freio",
				"description": "abs",
				"created_at": "2021-05-19T00:27:09.758Z"
			}
		],
	})
}
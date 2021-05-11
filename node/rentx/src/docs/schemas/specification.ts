export const specificationsSchema = {
	requestBody: (overrideConfig?: Record<string, unknown>) => ({
		type: "object",
		properties: {
			name: { type: "string" },
			description: { type: "string" },
		},
		...overrideConfig
	})
}
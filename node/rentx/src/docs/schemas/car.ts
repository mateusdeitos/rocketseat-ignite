export const carsSchema = {
	requestBody: (overrideConfig?: Record<string, unknown>) => ({
		type: "object",
		properties: {
			name: { type: "string" },
			description: { type: "string" },
			daily_rate: { type: "number" },
			fine_amount: { type: "number" },
			available: { type: "boolean" },
			license_plate: { type: "string" },
			brand: { type: "string" },
			category_id: { type: "string" },
		},
		...overrideConfig
	}),
	responseBody: (overrideConfig?: Record<string, unknown>) => ({
		type: "array",
		properties: {
			id: { type: "string" },
			name: { type: "string" },
			description: { type: "string" },
			daily_rate: { type: "number" },
			fine_amount: { type: "number" },
			available: { type: "boolean" },
			license_plate: { type: "string" },
			brand: { type: "string" },
			category_id: { type: "string" },
			created_at: { type: "string" }
		},
		example: [
			{
				"id": "8e42ea64-e63e-4f0f-ae07-a7f440f74dac",
				"available": true,
				"name": "Tiggo 2",
				"description": "SUV Chinesa bem top",
				"daily_rate": "50",
				"license_plate": "IZS2D83",
				"fine_amount": "10",
				"brand": "CAOA Chery",
				"category_id": "295f7d27-2d72-459d-830c-3e2dc23a4912",
				"created_at": "2021-05-18T10:13:19.769Z",
				"specifications": [
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
				]
			},
			{
				"id": "00892f9b-d6e1-4b7e-857b-e4449bed5e40",
				"available": true,
				"name": "Tiggo 7",
				"description": "SUV Chinesa bem top",
				"daily_rate": "50",
				"license_plate": "IZS2D12A",
				"fine_amount": "10",
				"brand": "CAOA Chery",
				"category_id": "295f7d27-2d72-459d-830c-3e2dc23a4912",
				"created_at": "2021-05-21T07:59:52.935Z",
				"specifications": []
			},
			{
				"id": "0e7ac25f-6ba1-4c62-aa87-6cb476426d15",
				"available": true,
				"name": "Tiggo 5x",
				"description": "SUV Chinesa bem top",
				"daily_rate": "50",
				"license_plate": "IZS2D123",
				"fine_amount": "10",
				"brand": "CAOA Chery",
				"category_id": "295f7d27-2d72-459d-830c-3e2dc23a4912",
				"created_at": "2021-05-18T10:41:13.207Z",
				"specifications": []
			}
		],
		...overrideConfig
	})
}
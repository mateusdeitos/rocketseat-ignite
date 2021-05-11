import { specificationsSchema } from "./schemas/specification";

export default function () {
	return {
		openapi: "3.0.0",
		info: {
			title: "RentX Documentation",

			description: "This is an API Rent",
			version: "1.0.0",
			contact: { email: "matdeitos@gmail.com" }
		},
		paths: {
			"/categories": {
				post: {
					tags: ["Category"],
					summary: "Create a category",
					description: "Create a new category",
					requestBody: {
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										name: { type: "string" },
										description: { type: "string" }
									},
									example: {
										name: "Category Sample",
										description: "Category description sample"
									}
								}
							}
						}
					},
					responses: {
						"201": { description: "Created" },
						"400": { description: "Category already exists" }
					}
				},
				get: {
					tags: ["Category"],
					summary: "List all Categories",
					description: "List all Categories",
					responses: {
						"200": {
							description: "Success",
							content: {
								"application/json": {
									type: "array",
									items: {
										type: "object",
										properties: {
											name: { type: "string" },
											description: { type: "string" }
										}
									}
								}
							}
						}
					}
				}
			},
			"/categories/import": {
				post: {
					tags: ["Category"],
					summary: "Upload new categories",
					description: "Upload new categories",
					requestBody: {
						content: {
							"multipart/form-data": {
								schema: {
									type: "object",
									properties: {
										file: { type: "string", format: "binary" }
									}
								}
							}
						}
					},
					responses: {
						201: { description: "Created" }
					}
				}
			},
			"/specifications": {
				post: {
					tags: ["Specifications"],
					summary: "Create a specification",
					description: "Create a new specification",
					requestBody: {
						content: {
							"application/json": {
								schema: {
									...specificationsSchema.requestBody()
								}
							}
						}
					},
					responses: {
						201: {
							description: "Created",
						},
						500: {
							description: "Specification already exists"
						}
					}
				}
			}
		}
	}
}
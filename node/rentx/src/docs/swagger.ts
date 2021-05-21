import { specificationsSchema } from "./schemas/specification";
import { authenticationSchema } from './schemas/authentication'
import { usersSchema } from "./schemas/user";
import { carsSchema } from "./schemas/car";

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
					security: [{ "bearerAuth": [] }],
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
					security: [{ "bearerAuth": [] }],
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
					security: [{ "bearerAuth": [] }],
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
				},
				get: {
					tags: ["Specifications"],
					summary: "List specifications",
					description: "List specifications",
					security: [{ "bearerAuth": [] }],
					responses: {
						200: {
							description: "Created",
							content: {
								"application/json": {
									schema: {
										...specificationsSchema.responseBody()
									}
								}
							}
						},
						400: {
							description: "Specification already exists"
						}
					}
				},
			},
			"/cars": {
				post: {
					tags: ["Cars"],
					summary: "Create a new car",
					description: "Create a new car",
					security: [{ "bearerAuth": [] }],
					requestBody: {
						content: {
							"application/json": {
								schema: {
									...carsSchema.requestBody()
								}
							}
						}
					},
					responses: {
						201: { description: "Created" },
						400: { description: "Car already exists" },
					}
				},
				get: {
					tags: ["Cars"],
					summary: "List all cars",
					description: "List all cars",
					security: [{ "bearerAuth": [] }],
					parameters: [
						{ in: 'query', name: 'limit', type: 'number', required: false, default: 20 },
						{ in: 'query', name: 'offset', type: 'number', required: false, default: 0 },
						{ in: 'query', name: 'q', type: 'string', required: false, description: "If present, will try to match a car name, description or category name" },
					],
					responses: {
						200: {
							content: {
								"application/json": {
									schema: {
										...carsSchema.responseBody()
									}
								}
							}
						}
					}
				}
			},
			"/sessions": {
				post: {
					tags: ["Sessions"],
					summary: "Authenticate user",
					description: "Authenticate user",
					requestBody: {
						content: {
							"application/json": {
								schema: {
									type: "object",
									properties: {
										email: { type: "string" },
										password: { type: "string" },
									},
								}
							}
						}
					},
					responses: {
						200: {
							description: "Success",
							content: {
								"application/json": {
									schema: {
										...usersSchema.responseBody()
									}
								}
							}

						},
						400: {
							description: "Bad Request"
						}
					}
				}
			}
		},
		components: {
			securitySchemes: {
				...authenticationSchema(),
			}
		}
	}
}
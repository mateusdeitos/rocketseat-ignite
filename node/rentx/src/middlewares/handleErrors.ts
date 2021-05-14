import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/AppError";


export const handleErrors = async (error: Error, request: Request, response: Response, _: NextFunction) => {
	if (error instanceof AppError) {
		return response.status(error.statusCode).json({ message: error.message });
	}

	return response.status(500).json({
		status: 'internal_error',
		message: `Internal server error ${error.message}`
	})
}
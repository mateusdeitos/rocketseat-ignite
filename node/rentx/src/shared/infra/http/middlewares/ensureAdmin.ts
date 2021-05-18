import { NextFunction, Request, Response } from "express"
import { decode, verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";

export const ensureAdmin = async (request: Request, response: Response, next: NextFunction) => {
	const { id } = request.user;

		const usersRepository = new UsersRepository();
		const user = await usersRepository.findByProp('id', id);
		if (!user) {
			throw new AppError("User not found");
		}
		if (!user.isAdmin) {
			throw new AppError("User is unauthorized to access", 403);
		}
		return next();


}
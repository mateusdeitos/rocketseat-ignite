import { NextFunction, Request, Response } from "express"
import { decode, verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/users/infra/typeorm/repositories/UsersRepository";

export const ensureAuthenticated = async (request: Request, response: Response, next: NextFunction) => {
	const { authorization } = request.headers;

	if (!authorization) {
		throw new AppError("Missing token", 401);
	}

	const [, token] = authorization.split(" ");

	try {
		verify(token, 'aehehauehuahuae');
		const { sub: id } = decode(token);
		const usersRepository = new UsersRepository();
		const user = await usersRepository.findByProp('id', id);
		if (!user) {
			throw new AppError("User not found");
		}
		request.user = { id };
		return next();
	} catch (error) {
		throw new AppError("Invalid token", 401);
	}


}
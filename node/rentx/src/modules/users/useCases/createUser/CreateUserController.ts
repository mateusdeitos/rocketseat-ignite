import { container } from "tsyringe";
import { ICreateUserDTO } from "../../repositories/IUsersRepository";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { Request, Response } from "express";

export class CreateUserController {
	public async handle(request: Request, response: Response) {
		const { driver_license, email, name, password } = request.body as ICreateUserDTO;
		const createUserUseCase = container.resolve(CreateUserUseCase);
		await createUserUseCase.execute({ driver_license, email, name, password });
		return response.status(201).send();
	}
}
import { container } from "tsyringe";
import { UserProfileUseCase } from "./UserProfileUseCase";
import { Request, Response } from "express";

export class UserProfileController {
	public async handle(request: Request, response: Response) {
		const { id } = request.params;
		const userProfileUseCase = container.resolve(UserProfileUseCase);
		const profile = await userProfileUseCase.execute(id);
		return response.json(profile);
	}
}
import { Request, Response } from "express";
import { container } from "tsyringe";
import { RefreshTokenUseCase } from "./RefreshTokenUseCase";


export class RefreshTokenController {
	async handle(request: Request, response: Response) {
		const token = request.body.refresh_token;

		const refreshTokenUseCase = container.resolve(RefreshTokenUseCase);
		const data = await refreshTokenUseCase.execute(token);

		return response.json(data);
	}
}
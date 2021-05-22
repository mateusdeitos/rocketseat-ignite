import { IBaseRepository } from "@shared/repositories/IBaseRepository";
import { UserToken } from "../infra/typeorm/entities/UserToken";

export interface ICreateUserTokenDTO {
	user_id: string;
	expires_date: Date;
	refresh_token: string;
}

export interface IUsersTokenRepository extends IBaseRepository<UserToken>{
	create(data: ICreateUserTokenDTO): Promise<UserToken>;
}
import { ICreateUserTokenDTO, IUsersTokenRepository } from "@modules/users/repositories/IUsersTokenRepository";
import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { UserToken } from "../entities/UserToken";

export class UsersTokenRepository implements IUsersTokenRepository {
	private repository: Repository<UserToken>;

	constructor() {
		this.repository = getRepository(UserToken)
	}

	async create(data: ICreateUserTokenDTO): Promise<UserToken> {
		const userToken = this.repository.create(data);
		return this.repository.save(userToken);
	}
	async findByProp(prop: keyof UserToken, value: string | User | Date): Promise<UserToken | undefined> {
		return this.repository.findOne({ where: { [prop]: value } });
	}
	async updateProp(id: string, prop: keyof UserToken, value: string | User | Date): Promise<void> {
		await this.repository.update(id, { [prop]: value });
	}

}
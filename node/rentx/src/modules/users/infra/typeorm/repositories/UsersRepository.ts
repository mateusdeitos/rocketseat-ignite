import { getRepository, Repository } from "typeorm";
import { User } from "../entities/User";
import { ICreateUserDTO, IUsersRepository } from "../../../repositories/IUsersRepository";


export class UsersRepository implements IUsersRepository {
	private repository: Repository<User>;
	constructor() {
		this.repository = getRepository(User);
	}
	public async create(data: ICreateUserDTO): Promise<void> {
		const user = this.repository.create(data);
		await this.repository.save(user);
	}
	public async findByProp(prop: keyof User, value: string | boolean | Date): Promise<User | undefined> {
		return this.repository.findOne({ where: { [prop]: value } });
	}

}
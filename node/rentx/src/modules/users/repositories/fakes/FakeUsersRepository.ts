import { User } from "../../infra/typeorm/entities/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";


export class FakeUsersRepository implements IUsersRepository {
	private categories: User[];
	private static INSTANCE: FakeUsersRepository;

	public constructor() {
		this.categories = [];
	}

	public static getInstance() {
		if (!this.INSTANCE) {
			return new FakeUsersRepository();
		}

		return this.INSTANCE;
	}

	async list(): Promise<User[]> {
		return this.categories;
	}

	async findByProp(prop: keyof User, value: User[keyof User]): Promise<User  | undefined> {
		return this.categories.find(c => c[prop] === value);
	}

	async create({ ...params }: ICreateUserDTO): Promise<void> {
		const user = new User();
		Object.assign(user, { ...params });
		this.categories.push(user);
	}

	async updateProp(id: string, prop: keyof User, value: User[keyof User]): Promise<void> {
		const index = this.categories.findIndex(u => u.id === id);
		if (index >= 0) {
			this.categories[index] = {
				...this.categories[index],
				[prop]: value,
			}
		}
	}

}
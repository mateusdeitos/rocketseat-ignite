import { User } from "../infra/typeorm/entities/User";

export type ICreateUserDTO = Pick<User, 'name' | 'password' | 'driver_license' | 'email'>

export interface IUsersRepository {
	create(data: ICreateUserDTO): Promise<void>;
	findByProp(prop: keyof User, value: User[keyof User]): Promise<User | undefined>;
	updateProp(id: string, prop: keyof User, value: User[keyof User]): Promise<void>;
}
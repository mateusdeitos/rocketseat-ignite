import { IProfileDTO } from "../repositories/IUsersRepository";
import { User } from '@modules/users/infra/typeorm/entities/User';
import { classToClass, classToPlain, plainToClass } from 'class-transformer'

export class UserMapper {

	static toDTO({
		driver_license,
		email,
		name,
		id,
		avatar_url,
		avatar
	}: User): IProfileDTO {
		const user = classToClass({
			id,
			email,
			name,
			avatar,
			avatar_url,
			driver_license,
		})
		return user;
	}
}
import { container } from 'tsyringe';
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';

export const TOKEN_CATEGORY_REPOSITORY = 'CategoriesRepository';
container.registerSingleton<ICategoriesRepository>(
	TOKEN_CATEGORY_REPOSITORY,
	CategoriesRepository
)
export const TOKEN_SPECIFICATION_REPOSITORY = 'SpecificationsRepository';
container.registerSingleton<ISpecificationsRepository>(
	TOKEN_SPECIFICATION_REPOSITORY,
	SpecificationsRepository
)
export const TOKEN_USERS_REPOSITORY = 'UsersRepository';
container.registerSingleton<IUsersRepository>(
	TOKEN_USERS_REPOSITORY,
	UsersRepository
)
import { container } from 'tsyringe';
import '../providers'
import { ICategoriesRepository } from '@modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '@modules/cars/infra/typeorm/repositories/CategoriesRepository';
import { SpecificationsRepository } from '@modules/cars/infra/typeorm/repositories/SpecificationsRepository';
import { ISpecificationsRepository } from '@modules/cars/repositories/ISpecificationsRepository';
import { UsersRepository } from '@modules/users/infra/typeorm/repositories/UsersRepository';
import { IUsersRepository } from '@modules/users/repositories/IUsersRepository';
import { ICarsRepository } from '@modules/cars/repositories/ICarsRepository';
import { CarsRepository } from '@modules/cars/infra/typeorm/repositories/CarsRepository';
import { ICarImagesRepository } from '@modules/cars/repositories/ICarImagesRepository';
import { CarImagesRepository } from '@modules/cars/infra/typeorm/repositories/CarImagesRepository';
import { RentalsRepository } from '@modules/rentals/infra/typeorm/RentalsRepository';
import { IRentalsRepository } from '@modules/rentals/repositories/IRentalsRepository';

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
export const TOKEN_CARS_REPOSITORY = 'CarsRepository';
container.registerSingleton<ICarsRepository>(
	TOKEN_CARS_REPOSITORY,
	CarsRepository
)
export const TOKEN_CARIMAGES_REPOSITORY = 'CarImagesRepository';
container.registerSingleton<ICarImagesRepository>(
	TOKEN_CARIMAGES_REPOSITORY,
	CarImagesRepository
)
export const TOKEN_RENTALS_REPOSITORY = 'RentalsRepository';
container.registerSingleton<IRentalsRepository>(
	TOKEN_RENTALS_REPOSITORY,
	RentalsRepository
)

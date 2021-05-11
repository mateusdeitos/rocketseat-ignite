import { container } from 'tsyringe';
import { ICategoriesRepository } from '../../modules/cars/repositories/ICategoriesRepository';
import { CategoriesRepository } from '../../modules/cars/repositories/implementations/CategoriesRepository';
import { SpecificationsRepository } from '../../modules/cars/repositories/implementations/SpecificationsRepository';
import { ISpecificationsRepository } from '../../modules/cars/repositories/ISpecificationsRepository';

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
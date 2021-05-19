import { ICarImagesRepository } from "@modules/cars/repositories/ICarImagesRepository";
import { getRepository, Repository } from "typeorm";
import { CarImage } from "../entities/CarImage";


export class CarImagesRepository implements ICarImagesRepository {
	private repository: Repository<CarImage>;

	constructor() {
		this.repository = getRepository(CarImage);
	}
	async create(car_id: string, image_name: string): Promise<CarImage> {
		const carImage = this.repository.create({ car_id, image_name });
		return this.repository.save(carImage);
	}

	async findByProp(prop: keyof CarImage, value: CarImage[keyof CarImage]): Promise<CarImage[]> {
		return this.repository.find({ where: { [prop]: value } });
	}

	async deleteByCarId(car_id: string): Promise<void> {
		await this.repository.delete({ car_id })
	}

}
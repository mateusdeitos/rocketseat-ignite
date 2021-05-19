import { CarImage } from "../infra/typeorm/entities/CarImage";


export interface ICarImagesRepository {
	create(car_id: string, image_name: string): Promise<CarImage>;
	findByProp(prop: keyof CarImage, value: CarImage[keyof CarImage]): Promise<CarImage[]>;
	deleteByCarId(car_id: string): Promise<void>;
}
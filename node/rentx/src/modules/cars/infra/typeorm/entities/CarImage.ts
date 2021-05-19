import { Column, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";


@Entity('car_images')
export class CarImage {
	@PrimaryColumn()
	id: string;

	@Column()
	car_id: string;

	@Column()
	image_name: string;

	@Column()
	created_at: string;

	constructor() {
		if (!this.id) this.id = v4();
	}

}
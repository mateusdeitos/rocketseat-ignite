import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Car } from "./Car";


@Entity('car_images')
export class CarImage {
	@PrimaryColumn()
	id: string;

	@Column()
	car_id: string;

	@Column()
	image_name: string;

	@ManyToOne(() => Car, car => car.images)
	@JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
	car: Car;

	@Column()
	created_at: string;

	constructor() {
		if (!this.id) this.id = v4();
	}

}
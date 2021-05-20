import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { User } from "@modules/users/infra/typeorm/entities/User";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 } from "uuid";


@Entity('rentals')
export class Rental {

	@PrimaryColumn()
	id: string;

	@Column()
	car_id: string;

	@ManyToOne(() => Car)
	@JoinColumn({ name: 'car_id', referencedColumnName: 'id' })
	car: Car;

	@Column()
	user_id: string;

	@ManyToOne(() => User)
	@JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
	user: User;

	@Column()
	start_date: Date;

	@Column()
	end_date: Date;

	@Column()
	expected_return_date: Date;

	@Column()
	total: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;

	constructor() {
		if (!this.id) this.id = v4();
	}
}
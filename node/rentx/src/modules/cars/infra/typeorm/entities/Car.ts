
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';

@Entity('cars')
export class Car {
	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@Column()
	daily_rate: number;

	@Column()
	available: boolean;

	@Column()
	license_plate: string;

	@Column()
	fine_amount: number;

	@Column()
	brand: string;

	@Column()
	category_id: string;

	@ManyToOne(() => Category)
	@JoinColumn({ name: 'category_id', referencedColumnName: 'id' })
	category: Category;

	@CreateDateColumn()
	created_at?: Date;

	constructor() {
		if (!this.id) this.id = uuid();
		this.available = true;
	}
}

import { Column, CreateDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Category } from './Category';
import { Specification } from './Specification';

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

	@ManyToMany(() => Specification)
	@JoinTable({
		name: 'specifications_cars',
		joinColumn: { name: 'car_id' }, // nome da coluna na tabela N-N que referencia o id do car
		inverseJoinColumn: { name: 'specification_id' } // chave da tabela de specifications
	})
	specifications: Specification[];

	@CreateDateColumn()
	created_at?: Date;

	constructor() {
		if (!this.id) this.id = uuid();
		this.available = true;
	}
}
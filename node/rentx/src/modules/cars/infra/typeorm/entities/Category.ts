
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { Car } from './Car';

@Entity('categories')
export class Category {
	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	created_at?: Date;

	constructor() {
		if (!this.id) this.id = uuid();
	}
}
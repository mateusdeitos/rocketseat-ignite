import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";

@Entity('users')
export class User {

	@PrimaryColumn()
	id?: string;

	@Column()
	name: string;
	
	@Column()
	password: string;

	@Column()
	email: string;

	@Column()
	driver_license: string;

	@Column()
	isAdmin: boolean;

	@Column()
	avatar_url: string;

	@CreateDateColumn()
	created_at: Date;

	constructor() {
		if (!this.id) this.id = v4();
	}

}
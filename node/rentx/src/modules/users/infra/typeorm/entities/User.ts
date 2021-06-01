import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 } from "uuid";
import { Exclude, Expose } from 'class-transformer'

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
	@Exclude()
	avatar: string;

	@CreateDateColumn()
	created_at: Date;

	@Expose()
	avatar_url(): string {
		switch (process.env.STORAGE_PROVIDER) {
			case 'local':
				return `${process.env.APP_API_URL}:${process.env.PORT}/avatar/${this.avatar}`;

			case 's3':
				return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`
		}
		return null;
	}

	constructor() {
		if (!this.id) this.id = v4();
	}

}
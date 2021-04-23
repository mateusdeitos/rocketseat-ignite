
import { v4 as uuid } from 'uuid';

export class Category {
	name: string;
	description: string;
	id?: string;
	created_at?: Date;
	constructor() {
		if (!this.id) this.id = uuid();
		if (!this.created_at) this.created_at = new Date();
	}
}
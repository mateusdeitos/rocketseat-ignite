import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AlterTableUserColumnAvatar1622460187467 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('users', 'avatar_url', new TableColumn({
			name: 'avatar', 
			type: 'varchar',
			isNullable: true,
		}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.changeColumn('users', 'avatar', new TableColumn({
			name: 'avatar_url', 
			type: 'varchar',
			isNullable: true,
		}))
    }

}

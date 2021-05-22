import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1621686419445 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table({
			name: 'users_token',
			columns: [
				{
					name: 'id',
					type: 'uuid',
					isPrimary: true,
				},
				{
					name: 'refresh_token',
					type: 'varchar',
				},
				{
					name: 'user_id',
					type: 'uuid',
				},
				{
					name: 'expires_date',
					type: 'timestamp'
				},
				{
					name: 'created_at',
					type: 'timestamp',
					default: 'now()'
				},

			],
			foreignKeys: [
				{
					name: 'FK_user_id',
					referencedColumnNames: ['id'],
					referencedTableName: 'users', 
					columnNames: ['user_id'],
					onDelete: 'CASCADE',
					onUpdate: 'CASCADE',
				}
			]
		}))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('users_token');
    }

}

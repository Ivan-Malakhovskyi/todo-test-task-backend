import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedEmptyColumns1746108786211 implements MigrationInterface {
    name = 'RemovedEmptyColumns1746108786211'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`phone\``);
        await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`new\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`new\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`users\` ADD \`phone\` varchar(255) NOT NULL`);
    }

}

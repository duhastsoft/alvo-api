import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedRequiresOrderAndLocalImageColumnsToQuestion1604012047845 implements MigrationInterface {
    name = 'AddedRequiresOrderAndLocalImageColumnsToQuestion1604012047845'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "question"
            ADD "localImage" character varying
        `);
        await queryRunner.query(`
            ALTER TABLE "question"
            ADD "requiresOrder" boolean NOT NULL DEFAULT false
        `);
        await queryRunner.query(`
            CREATE INDEX "IDX_7806a14d42c3244064b4a1706c" ON "service" ("name")
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP INDEX "IDX_7806a14d42c3244064b4a1706c"
        `);
        await queryRunner.query(`
            ALTER TABLE "question" DROP COLUMN "requiresOrder"
        `);
        await queryRunner.query(`
            ALTER TABLE "question" DROP COLUMN "localImage"
        `);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class MakingFieldsDecimal1605768850405 implements MigrationInterface {
    name = 'MakingFieldsDecimal1605768850405'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "latitud"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "latitud" numeric`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "longitude" numeric`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "longitude" integer`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "latitud"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "latitud" integer`);
    }

}

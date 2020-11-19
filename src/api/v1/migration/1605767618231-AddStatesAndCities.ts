import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStatesAndCities1605767618231 implements MigrationInterface {
    name = 'AddStatesAndCities1605767618231'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" ADD "states" character varying NOT NULL DEFAULT 'La Libertad'`);
        await queryRunner.query(`ALTER TABLE "service" ADD "cities" character varying NOT NULL DEFAULT 'Santa Tecla'`);
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "latitud"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "latitud" integer`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "longitude" integer`);
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "categoryId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8" FOREIGN KEY ("categoryId") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8"`);
        await queryRunner.query(`ALTER TABLE "service" ALTER COLUMN "categoryId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "longitude"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "longitude" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "latitud"`);
        await queryRunner.query(`ALTER TABLE "service" ADD "latitud" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8" FOREIGN KEY ("categoryId") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "cities"`);
        await queryRunner.query(`ALTER TABLE "service" DROP COLUMN "states"`);
    }

}

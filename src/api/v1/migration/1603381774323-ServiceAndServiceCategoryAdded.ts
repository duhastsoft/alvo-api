import {MigrationInterface, QueryRunner} from "typeorm";

export class ServiceAndServiceCategoryAdded1603381774323 implements MigrationInterface {
    name = 'ServiceAndServiceCategoryAdded1603381774323'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "service_category" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, CONSTRAINT "PK_9d513b39d251063f98f2a7b941d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "service" ("createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "id" SERIAL NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "serviceHours" character varying NOT NULL, "contactNumber" character varying NOT NULL, "address" character varying NOT NULL, "contactName" character varying NOT NULL, "image" character varying NOT NULL, "latitud" character varying NOT NULL, "longitude" character varying NOT NULL, "priceRange" character varying NOT NULL, "categoryId" integer, CONSTRAINT "PK_85a21558c006647cd76fdce044b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "service" ADD CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8" FOREIGN KEY ("categoryId") REFERENCES "service_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "service" DROP CONSTRAINT "FK_cb169715cbb8c74f263ba192ca8"`);
        await queryRunner.query(`DROP TABLE "service"`);
        await queryRunner.query(`DROP TABLE "service_category"`);
    }

}

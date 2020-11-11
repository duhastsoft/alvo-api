import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveRoleAndPermissionEntity1604984517439 implements MigrationInterface {
  name = 'RemoveRoleAndPermissionEntity1604984517439';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "FK_c28e52f758e7bbc53828db92194"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "roleId"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "role" character varying NOT NULL`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "UQ_4ab2df0a57a74fdf904e0e27086" UNIQUE ("account")`
    );
    await queryRunner.query(`
      ALTER TABLE "permission" DROP CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e"
    `);
    await queryRunner.dropTable('role');
    await queryRunner.dropTable('permission');
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "role_id_seq"`);
    await queryRunner.query(`DROP SEQUENCE IF EXISTS "permission_id_seq"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "role" (
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          "id" SERIAL NOT NULL,
          "name" character varying NOT NULL,
          "description" character varying NOT NULL,
          CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      CREATE TABLE "permission" (
          "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
          "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
          "id" SERIAL NOT NULL,
          "name" character varying NOT NULL,
          "actions" text NOT NULL,
          "roleId" integer,
          CONSTRAINT "PK_3b8b97af9d9d8807e41e6f48362" PRIMARY KEY ("id")
      )
    `);
    await queryRunner.query(`
      ALTER TABLE "permission"
      ADD CONSTRAINT "FK_cdb4db95384a1cf7a837c4c683e" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
    `);
    await queryRunner.query(`ALTER TABLE "user" DROP CONSTRAINT "UQ_4ab2df0a57a74fdf904e0e27086"`);
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "role"`);
    await queryRunner.query(`ALTER TABLE "user" ADD "roleId" integer`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES "role"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }
}

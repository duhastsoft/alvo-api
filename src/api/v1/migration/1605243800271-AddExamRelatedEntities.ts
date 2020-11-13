import {MigrationInterface, QueryRunner} from "typeorm";

export class AddExamRelatedEntities1605243800271 implements MigrationInterface {
    name = 'AddExamRelatedEntities1605243800271'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "exam" ("id" SERIAL NOT NULL, "start_time" TIMESTAMP WITH TIME ZONE NOT NULL, "end_time" TIMESTAMP WITH TIME ZONE NOT NULL, "exam_type" character varying NOT NULL, "category" integer, "grade" numeric NOT NULL, "user_id" uuid NOT NULL, CONSTRAINT "PK_56071ab3a94aeac01f1b5ab74aa" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exam_question" ("question_id" integer NOT NULL, "exam_id" integer NOT NULL, "selected_answer" integer NOT NULL, "right_answer" integer NOT NULL, CONSTRAINT "PK_f1c91632d3fd2494a9e35d1a3ec" PRIMARY KEY ("question_id", "exam_id"))`);
        await queryRunner.query(`ALTER TABLE "exam" ADD CONSTRAINT "FK_41a4c0f5b2532075fe0ac24641f" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_question" ADD CONSTRAINT "FK_6664355ca7a2d081b4d89cc1ea3" FOREIGN KEY ("exam_id") REFERENCES "exam"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exam_question" ADD CONSTRAINT "FK_68081ef3d5147dc089925668d87" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exam_question" DROP CONSTRAINT "FK_68081ef3d5147dc089925668d87"`);
        await queryRunner.query(`ALTER TABLE "exam_question" DROP CONSTRAINT "FK_6664355ca7a2d081b4d89cc1ea3"`);
        await queryRunner.query(`ALTER TABLE "exam" DROP CONSTRAINT "FK_41a4c0f5b2532075fe0ac24641f"`);
        await queryRunner.query(`DROP TABLE "exam_question"`);
        await queryRunner.query(`DROP TABLE "exam"`);
    }

}

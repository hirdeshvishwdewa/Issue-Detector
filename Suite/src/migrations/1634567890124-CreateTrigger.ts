import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTrigger1634567890124 implements MigrationInterface {
    name = 'CreateTrigger1634567890124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "trigger" (
                "id" SERIAL NOT NULL,
                "triggerId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "state" character varying(50) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_triggerId" UNIQUE ("triggerId"),
                CONSTRAINT "PK_triggerId" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "trigger"`);
    }
}

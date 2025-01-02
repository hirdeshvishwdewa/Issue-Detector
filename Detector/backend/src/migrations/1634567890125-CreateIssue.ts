import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateIssue1634567890125 implements MigrationInterface {
    name = 'CreateIssue1634567890125'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "issue" (
                "id" SERIAL NOT NULL,
                "status" character varying(50) NOT NULL,
                "type" character varying(50) NOT NULL,
                "details" jsonb,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_issueId" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "issue"`);
    }
}

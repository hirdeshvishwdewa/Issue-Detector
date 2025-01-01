import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDevice1634567890123 implements MigrationInterface {
    name = 'CreateDevice1634567890123'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "device" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "state" character varying NOT NULL,
                "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "device"`);
    }
}

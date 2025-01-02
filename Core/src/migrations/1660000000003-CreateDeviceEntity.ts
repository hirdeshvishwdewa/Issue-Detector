import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDeviceEntity1660000000003 implements MigrationInterface {
    name = 'CreateDeviceEntity1660000000003';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "device" (
                "id" SERIAL NOT NULL,
                "deviceId" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "state" character varying(50) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
                "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "PK_d3c0c71f23e7adcf952a1d13423" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "device"
        `);
    }
}

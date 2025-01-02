import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDeviceId1660000000003 implements MigrationInterface {
    name = 'UpdateDeviceId1660000000003'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT IF EXISTS "PK_deviceId"`);
        await queryRunner.query(`ALTER TABLE "device" ADD CONSTRAINT "UQ_deviceId" UNIQUE ("deviceId")`);
        await queryRunner.query(`ALTER TABLE "device" ALTER COLUMN "deviceId" SET DEFAULT uuid_generate_v4()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "device" ALTER COLUMN "deviceId" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT IF EXISTS "UQ_deviceId"`);
        await queryRunner.query(`ALTER TABLE "device" DROP CONSTRAINT IF EXISTS "PK_deviceId"`);
    }
}

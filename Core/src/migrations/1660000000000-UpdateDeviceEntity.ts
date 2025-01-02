import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateDeviceEntity1660000000000 implements MigrationInterface {
    name = 'UpdateDeviceEntity1660000000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TYPE IF NOT EXISTS "device_state_enum" AS ENUM('active', 'low_stock', 'out_of_stock', 'error')
        `);
        await queryRunner.query(`
            ALTER TABLE "device" 
            ADD COLUMN IF NOT EXISTS "deviceId" uuid NOT NULL DEFAULT uuid_generate_v4(),
            ADD COLUMN IF NOT EXISTS "state" "device_state_enum" NOT NULL DEFAULT 'active'
        `);
        await queryRunner.query(`
            ALTER TABLE "device" 
            DROP COLUMN IF EXISTS "state"
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "device" 
            ADD COLUMN IF NOT EXISTS "state" character varying NOT NULL
        `);
        await queryRunner.query(`
            ALTER TABLE "device" 
            DROP COLUMN IF EXISTS "deviceId",
            DROP COLUMN IF EXISTS "state"
        `);
        await queryRunner.query(`
            DROP TYPE IF EXISTS "device_state_enum"
        `);
    }
}

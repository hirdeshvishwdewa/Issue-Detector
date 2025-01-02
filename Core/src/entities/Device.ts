import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Device extends BaseEntity {
    constructor(device?: Device) {
        super();
        Object.assign(this, device);
    }
    @Column({ type: 'uuid', unique: true, generated: 'uuid' })
    deviceId!: string;

    @Column()
    state!: string;
}
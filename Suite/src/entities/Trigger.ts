import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Trigger extends BaseEntity {
    constructor(trigger?: Trigger) {
        super();
        Object.assign(this, trigger);
    }
    @Column({ type: 'uuid', unique: true, generated: 'uuid' })
    triggerId!: string;

    @Column()
    state!: string;
}
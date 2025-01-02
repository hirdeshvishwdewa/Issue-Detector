import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';

@Entity()
export class Device extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    deviceId!: string;

    @Column()
    state!: string;
}
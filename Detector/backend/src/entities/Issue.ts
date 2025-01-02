import { Entity, Column } from 'typeorm';
import { BaseEntity } from './BaseEntity';
import { IssueDetails } from '../utils/globalInterfaces';

@Entity()
export class Issue extends BaseEntity {
    constructor(issue?: Issue) {
        super();
        Object.assign(this, issue);
    }

    @Column({ type: 'varchar', length: 50 })
    status!: string;

    @Column({ type: 'varchar', length: 50 })
    type!: string;

    @Column({ type: 'json' })
    details!: IssueDetails;
}
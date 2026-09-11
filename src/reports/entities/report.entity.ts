import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('WATER_REPORT')
export class Report {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    address!: string;

    @Column()
    description!: string;

    // low / medium / high
    @Column()
    severity!: string;

    @Column()
    reporterPhone!: string;

    @Column({ default: false })
    isResolved!: boolean;

    @CreateDateColumn()
    createdAt!: Date;
}
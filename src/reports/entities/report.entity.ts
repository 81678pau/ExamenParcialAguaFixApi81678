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

    // URL de la foto de la fuga (S3)
    @Column({ type: 'varchar', nullable: true })
    photoUrl!: string | null;

    // El examen la pide en el GET; queda vacía (null) hasta que exista una foto de reparación
    @Column({ type: 'varchar', nullable: true })
    repairPhotoUrl!: string | null;
}
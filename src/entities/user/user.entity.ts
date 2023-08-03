import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { UserReport } from "../user_report/userReport";

@Entity({ name: 'User' })
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column('varchar')
    fullName: string;

    @Column('varchar', { unique: true })
    userName: string;

    @Column('varchar', { select: false })
    password: string;

    @Column('varchar', { default: 'user' })
    role: string;

    @CreateDateColumn()
    createdAt?: string;

    @UpdateDateColumn()
    updatedAt?: string;

    @ManyToOne(() => User, (user) => user.users)
    @JoinColumn({ name: 'createdBy' })
    createdBy: User;

    @OneToMany(() => User, (user) => user.createdBy)
    users?: User[];

    @OneToMany(() => UserReport, (report) => report.user)
    user_reports: UserReport[];
}
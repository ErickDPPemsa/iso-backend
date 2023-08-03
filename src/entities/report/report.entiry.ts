import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserReport } from "../user_report/userReport";

@Entity({ name: 'Report' })
export class Report {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column('varchar')
    name: string;

    @OneToMany(() => UserReport, (report) => report.report)
    report_reports: UserReport[]
}
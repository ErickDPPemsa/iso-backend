import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Report } from "../report/report.entiry";
import { User } from "../user/user.entity";

@Entity({ name: 'UserReport' })
export class UserReport {
    @PrimaryGeneratedColumn('increment')
    id?: number;

    @ManyToOne(() => Report, (report) => report.report_reports)
    @JoinColumn({ name: 'reportId' })
    report: Report;

    @ManyToOne(() => User, (user) => user.user_reports)
    @JoinColumn({ name: 'userId' })
    user: User;
}
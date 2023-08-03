import { DataSource, ErrorDescription, FindOneOptions, Repository } from "typeorm";
import { User } from "./user.entity";
import bcrypt from 'bcrypt';
import { UpdateUserDto } from "./dto";

enum role {
    admin = 'admin',
    user = 'user'
};

export class UserService {
    private repository: Repository<User>;

    constructor(DS: DataSource) {
        this.repository = DS.getRepository(User);
    }

    async create(user: User) {
        try {
            const userCreate = this.repository.create(user);
            userCreate.password = bcrypt.hashSync(user.password, 10);
            if (userCreate.createdBy === null && (!userCreate.role || user.role === role.user)) {
                this.handleError({ message: 'Unauthorized' }, 401)
            }
            const created = await this.repository.save(userCreate);
            delete created.password;
            return created;
        } catch (error) { this.handleError(error) }
    }

    async findOne(options: FindOneOptions<User>) {
        try {
            const user = await this.repository.findOne(options);
            if (!user) this.handleError({ message: `user not found` }, 404);
            return user;
        } catch (error) { this.handleError(error) }

    }

    getUsers() {
        return this.repository.find({
            relations: {
                createdBy: true
            }
        })
    }

    handleError({ message }: ErrorDescription, code?: number) {
        throw { code: code ?? 400, message };
    }

    async update(id: string, dto: UpdateUserDto) {
        try {
            const user = await this.repository.findOne({ where: { id } });
            if (!user) this.handleError({ message: `user not found` }, 404);
            const password: string = (dto.password) ? bcrypt.hashSync(dto.password, 10) : user.password;
            const updated = await this.repository.save({ ...user, ...dto, password });
            delete updated.password;
            return updated;
        } catch (error) { this.handleError(error) }

    }

    async delete(id: string) {
        const user = await this.repository.findOne({
            where: { id },
            relations: {
                users: true
            }
        });
        if (!user) this.handleError({ message: `user not found` }, 404);
        if (user.users) {
            if (user.users.find(user => user.role === role.admin)) {
                this.handleError({ message: `user ${user.fullName} have's at least one admin user` }, 400);
            } else {
                await this.repository.remove(user.users);
            }
        }
        return this.repository.remove(user);
    }
}
import { DataSource } from "typeorm";
import { UserService } from './user.service';
import { NextFunction, Request, Response } from "express";
import { plainToClass } from 'class-transformer';
import { User } from "./user.entity";
import HttpException from "../../exceptions/HttpException";
import { Error } from './user.interfaces';
import { UpdateUserDto } from "./dto";

export class UserController {
    private service: UserService;

    constructor(DS: DataSource) {
        this.service = new UserService(DS);
    }

    private async handleError<T extends Error | {}>(error: T, res: Response) {
        try {
            const err = error as Error;
            return res.status(err.code).json(err);
        } catch (err) {
            return new HttpException(500, `${error}`, res);
        }
    }

    async createUser(req: Request, resp: Response) {
        try {

            const user: User | null =
                // await this.service.findOne({
                //     where: { id: 'A177433E-F36B-1410-8ADA-00ECBFE6D18E' }
                // });
                null;

            if (user && user.role === 'user') return this.handleError({ message: 'Unauthorized', code: 401 }, resp);

            const created = await this.service.create({
                ...plainToClass(User, req.body),
                createdBy: user
            });
            if (created && created.createdBy) {
                delete created.createdBy.password;
            }
            return resp.json({ created })
        } catch (error) { this.handleError(error, resp) }
    }

    async findAll(req: Request, resp: Response) {
        try {
            const users = await this.service.getUsers();
            resp.json({ users })
        } catch (error) { this.handleError(error, resp) }
    }

    async findById(req: Request, resp: Response) {
        try {
            const user = await this.service.findOne({ where: { id: req.params.id }, relations: { createdBy: true } });
            resp.json({ user });
        } catch (error) { this.handleError(error, resp) }
    }

    async update(req: Request, resp: Response) {
        try {
            const updated = await this.service.update(req.params.id, plainToClass(UpdateUserDto, req.body));
            resp.json({ updated });
        } catch (error) { this.handleError(error, resp) }
    }

    async delete(req: Request, resp: Response, next: NextFunction) {
        try {
            await this.service.delete(req.params.id);
            resp.json({
                deleted: true
            })
        } catch (error) { this.handleError(error, resp) }
    }

}
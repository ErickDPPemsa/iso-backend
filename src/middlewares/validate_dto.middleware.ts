import { plainToClass } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';
import { NextFunction, Request, RequestHandler, Response } from 'express';
import HttpException from '../exceptions/HttpException';

type ClassConstructor<T> = {
    new(...args: any[]): T;
};

export function validateDto<T extends Object>(dto: ClassConstructor<T>): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
        validate(plainToClass(dto, req.body))
            .then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    const message = errors.map((error: ValidationError) => Object.values(error.constraints)).join(', ');
                    return new HttpException(400, message, res);
                } else {
                    next();
                }
            });
    };
}
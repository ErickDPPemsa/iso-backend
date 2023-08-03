import { Response } from "express";

class HttpException extends Error {
    public res: Response;
    public status: number;
    public message: string;
    constructor(status: number, message: string, res: Response) {
        super(message);
        this.res = res;
        this.status = status;
        this.message = message;
        this.send(res);
    }
    private send(res: Response): Response {
        return res.status(this.status).json({
            status: this.status,
            message: this.message
        });
    }
}

export default HttpException;
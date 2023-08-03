import { Router } from "express"
import { DataSource } from "typeorm";
import { UserController } from "../entities";
import { validateDto } from "../middlewares/validate_dto.middleware";
import { CreateUserDto, UpdateUserDto } from "../entities/user/dto";

export class UserRouter {
    private router: Router;
    private controller: UserController;

    constructor(DS: DataSource) {
        this.router = Router();
        this.controller = new UserController(DS);
        this.setupRoutes();
    }

    private setupRoutes() {
        this.router.get('/', [], this.controller.findAll.bind(this.controller));
        this.router.get('/:id', [], this.controller.findById.bind(this.controller));
        this.router.patch('/:id', [validateDto(UpdateUserDto)], this.controller.update.bind(this.controller));
        this.router.post('/', [validateDto(CreateUserDto)], this.controller.createUser.bind(this.controller));
        this.router.delete('/:id', [], this.controller.delete.bind(this.controller));
    }

    getRouter() {
        return this.router;
    }
}
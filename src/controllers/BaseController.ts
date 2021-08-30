import Router from 'express';

export interface IChessController {
    initializeRoutes();
}

export class BaseController {
    protected apiRoot = '/api';
    protected route: string;
    protected router = Router();

    constructor(route: string) {
        this.route = `${this.apiRoot}${route}`;
    }
}

//export default BaseController;
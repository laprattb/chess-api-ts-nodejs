import { Request, RequestHandler, Response } from 'express';
import Game, { FillBoard } from '../models/game';
import Joi from '@hapi/joi';
import requestMiddleware from '../middleware/request-handler';

interface ICreateBody {
    name: string
}

export const createGameSchema = Joi.object().keys({
    name: Joi.string().required()
});

// Create a new game
export const create: RequestHandler = async (req: Request<{}, {}, ICreateBody>, res) => {
    const { name } = req.body;
    console.log(req.body);

    let game = new Game({ name, board: new Array<number>(64) });
    game = FillBoard(game);
    await game.save();

    res.status(201).send({
        message: 'Saved',
        game: game.toJSON()
    });
};

const getState: RequestHandler = async (req, res, next) => {
    res.status(501).send();
};

export default requestMiddleware(create, { validation: { body: createGameSchema } });
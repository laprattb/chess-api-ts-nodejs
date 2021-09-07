import { Request, RequestHandler, Response } from 'express';
import Game, { IGame } from '../models/game';
import { ResetBoard } from '../lib/chess';
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
    game = ResetBoard(game);
    await game.save();

    res.status(201).send({
        message: 'Saved',
        game: game.toJSON()
    });
};

// Gets the game by ID including state & current player
export const getGame: RequestHandler = async (req: Request, res) => {
    const { gameid } = req.params;

    let game = await Game.findById(gameid);
    if (!game) {
        return res.status(404).send({
            error: 'Game not found'
        });
    }

    res.status(200).send({
        game: game.toJSON()
    });
};

export const getMoves = async (req: Request, res) => {
    const { gameid, coord } = req.params;

    res.status(200)
};

export default requestMiddleware(create, { validation: { body: createGameSchema } });
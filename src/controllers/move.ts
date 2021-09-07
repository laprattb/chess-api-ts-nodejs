import { Request, RequestHandler, Response } from 'express';
import Game, { Move } from '../models/game';
import { GetMoves } from '../lib/chess';
import { BoardCoordinate } from '../models/pieces';
import Joi from '@hapi/joi';
import requestMiddleware from '../middleware/request-handler';

interface IMoveBody {

}

export const moveSchema = Joi.object().keys({
});

// Create a new game
const move: RequestHandler = async (req: Request<{}, {}, IMoveBody>, res) => {
    res.status(500).send();
};

export default requestMiddleware(move, { validation: { body: moveSchema } });
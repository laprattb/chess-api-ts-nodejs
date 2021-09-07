import { Request, RequestHandler, Response } from 'express';
import Game, { Move } from '../models/game';
import { GetMoves, MovePiece } from '../lib/chess';
import { BoardCoordinate } from '../models/pieces';
import Joi from '@hapi/joi';
import requestMiddleware from '../middleware/request-handler';

interface IMoveBody {
    move_from: BoardCoordinate;
    move_to: BoardCoordinate;
}

export const moveSchema = Joi.object().keys({
    move_from: Joi.string().required(),
    move_to: Joi.string().required()
});

// Move a piece on the game board
const move: RequestHandler = async (req: Request<{}, {}, IMoveBody>, res) => {
    const { gameid } = (req as any).params;
    const { move_from, move_to } = req.body;
    let ret: Move;

    let game = await Game.findById(gameid);
    if (!game) {
        return res.status(404).send({
            error: 'Game not found'
        });
    }

    try {
        ret = MovePiece(game, move_from, move_to);
    } catch (err) {
        res.status(405).send({
            error: err
        });
    }

    res.status(200).send({
        move: ret
    })
};

export default requestMiddleware(move, { validation: { body: moveSchema } });
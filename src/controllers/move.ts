import { Request, RequestHandler, Response } from 'express';
import Game, { Move, IGameModel } from '../models/game';
import { GetMoves, MovePiece } from '../lib/chess';
import { BoardCoordinate } from '../models/pieces';
import Joi from '@hapi/joi';
import requestMiddleware from '../middleware/request-handler';

interface IMoveBody {
    move_from: BoardCoordinate;
    move_to: BoardCoordinate;
}

export const coordSchema = Joi.object().keys({
    row: Joi.number().required(),
    column: Joi.number().required()
});

export const moveSchema = Joi.object({
    move_from: coordSchema,
    move_to: coordSchema
});

// Move a piece on the game board
const move: RequestHandler = async (req: Request<{}, {}, IMoveBody>, res) => {
    const { gameid } = (req as any).params;
    const { move_from, move_to } = req.body;

    let game = await Game.findById(gameid);
    if (!game) {
        return res.status(404).send({
            error: 'Game not found'
        });
    }

    try {
        MovePiece(game, move_from, move_to);
    } catch (err) {
        res.status(405).send({
            error: err
        });
    }

    let ret = await Game.findOneAndUpdate({ id: game.id }, {
        $set: {
            board: game.board,
            current_player: game.current_player,
            moves_counter: game.moves_counter
        }
    }, { new: true });

    res.status(200).send({
        game: ret
    })
};

export default requestMiddleware(move, { validation: { body: moveSchema } });
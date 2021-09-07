import { Request, RequestHandler, Response } from 'express';
import Game, { Move } from '../models/game';
import { GetMoves } from '../lib/chess';
import { BoardCoordinate } from '../models/pieces';
import Joi from '@hapi/joi';
import requestMiddleware from '../middleware/request-handler';

interface GetMovesQuery {
    row?: number;
    column?: number;
}

const getMoves: RequestHandler = async (req: Request<{}, {}, {}, GetMovesQuery>, res) => {
    const { gameid } = (req as any).params;
    const { row, column } = req.query;

    let game = await Game.findById(gameid);
    if (!game) {
        return res.status(404).send({
            error: 'Game not found'
        });
    }

    let moves: Move[] = GetMoves(game, new BoardCoordinate(row, column));
    res.status(200).send({
        moves: game.toJSON()
    });
};

export default requestMiddleware(getMoves);
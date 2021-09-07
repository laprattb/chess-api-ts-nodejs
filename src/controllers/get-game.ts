import { Request, RequestHandler, Response } from 'express';
import Game from '../models/game';
import requestMiddleware from '../middleware/request-handler';

// Gets the game by ID including state & current player
const getGame: RequestHandler = async (req: Request, res) => {
    const { gameid } = req.params;

    let game = await Game.findById(gameid);
    if (!game) {
        return res.status(404).send({
            error: 'Game not found'
        });
    }

    res.status(200).send({
        message: 'fetched',
        game: game.toJSON()
    });
};

export default requestMiddleware(getGame);
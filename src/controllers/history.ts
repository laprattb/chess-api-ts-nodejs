import { Request, RequestHandler, Response } from 'express';
import Game from '../models/game';
import requestMiddleware from '../middleware/request-handler';

// Gets the game by ID including state & current player
const getGameHistory: RequestHandler = async (req: Request, res) => {
    res.status(500).send();
};

export default requestMiddleware(getGameHistory);
import { RequestHandler } from 'express';
import Game from '../models/game';

export const create: RequestHandler = async (req, res, next) => {
    res.status(501).send();
};

export const getState: RequestHandler = async (req, res, next) => {
    res.status(501).send();
};
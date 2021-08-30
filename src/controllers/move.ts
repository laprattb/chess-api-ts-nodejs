import { RequestHandler } from 'express';

export const getMoves: RequestHandler = async (req, res, next) => {
    res.status(501).send();
};

export const move: RequestHandler = async (req, res, next) => {
    res.status(501).send();
};
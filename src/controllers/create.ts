import { Request, RequestHandler, Response } from "express";
import Game, { IGame } from "../models/game";
import { ResetBoard } from "../lib/chess";
import Joi from "joi";
import requestMiddleware from "../middleware/request-handler";

interface ICreateBody {
  name: string;
}

export const createGameSchema = Joi.object({
  name: Joi.string().required(),
});

// Create a new game
const create: RequestHandler = async (
  req: Request<{}, {}, ICreateBody>,
  res
) => {
  const { name } = req.body;
  console.log(req.body);

  let game = new Game({ name, board: new Array<number>(64) });
  game = ResetBoard(game);
  await game.save();

  res.status(201).send({
    message: "Saved",
    game: game.toJSON(),
  });
};

export default requestMiddleware(create, {
  validation: { body: createGameSchema },
});

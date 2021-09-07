import mongoose from 'mongoose';
import { ChessPiece, BoardCoordinate } from './pieces';

export interface IGame {
    name: string,
    current_player: string,
    moves_counter: number,
    board: number[][]
}

export class Move {
    original_coordinate: BoardCoordinate;
    new_coordinate: BoardCoordinate;
    captured_piece: ChessPiece;

    constructor(ocoordinate: BoardCoordinate, ncoordinate: BoardCoordinate, captured: ChessPiece) {
        this.original_coordinate = ocoordinate;
        this.new_coordinate = ncoordinate;
        this.captured_piece = captured;
    }
}

export enum Player {
    WHITE = "WHITE",
    BLACK = "BLACK",
    NONE = "NONE"
}

export interface IGameModel extends mongoose.Model<IGame> { }

const schema = new mongoose.Schema<IGame>({
    name: {
        type: String,
        required: true,
        index: true
    },
    current_player: {
        type: String,
        required: false,
        default: "WHITE",
        index: false
    },
    moves_counter: {
        type: Number,
        required: false,
        default: 1,
        index: false
    },
    board: [[Number]]
});

const Game: IGameModel = mongoose.model<IGame, IGameModel>('Game', schema);
export default Game;
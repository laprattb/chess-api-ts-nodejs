import mongoose from 'mongoose';

export interface IGame {
    name: string,
    board: number[]
}
interface IGameModel extends mongoose.Model<IGame> { }

export enum ChessPiece {
    KING,
    QUEEN,
    ROOK,
    BISHOP,
    KNIGHT,
    PAWN
}

const schema = new mongoose.Schema<IGame>({
    name: {
        type: String,
        required: true,
        index: true
    },
    board: {
        type: [Number],
        required: true,
        index: false
    }
});

const Game: IGameModel = mongoose.model<IGame, IGameModel>('Game', schema);
export default Game;

export const FillBoard = (game: IGameModel): IGameModel => {
    return game;
}

// export default class Game extends mongoose.Model implements IGame {
//     name: string;
//     board: number[];

//     constructor(name: string) {
//         this.name = name;
//         this.board = new Array<number>(64);
//     }
// }
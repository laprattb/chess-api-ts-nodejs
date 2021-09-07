import { describe } from 'mocha';
import Game from '../src/models/game';
import { ResetBoard } from '../src/lib/chess';
import { expect } from 'chai';
import { BoardCoordinate, ChessPiece, ChessPiece as CP } from '../src/models/pieces';

const boardStart: CP[][] = [
    [CP.W_ROOK, CP.W_KNIGHT, CP.W_BISHOP, CP.W_KING, CP.W_QUEEN, CP.W_BISHOP, CP.W_KNIGHT, CP.W_ROOK],
    [CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN],
    [CP.B_ROOK, CP.B_KNIGHT, CP.B_BISHOP, CP.B_KING, CP.B_QUEEN, CP.B_BISHOP, CP.B_KNIGHT, CP.B_ROOK]
]
describe('Testing for the chess library', () => {
    describe('Test resetting the board', () => {
        it('should set the game board to start condition', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            expect(game.board).to.equal(boardStart);
        });
    });

    describe('Test getting potential moves', () => {

    });
});
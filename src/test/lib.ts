import { describe } from 'mocha';
import Game, { Move } from '../models/game';
import { ResetBoard, GetMoves } from '../lib/chess';
import { expect } from 'chai';
import { BoardCoordinate, ChessPiece, ChessPiece as CP } from '../models/pieces';

const boardStart: CP[][] = [
    [CP.W_ROOK, CP.W_KNIGHT, CP.W_BISHOP, CP.W_KING, CP.W_QUEEN, CP.W_BISHOP, CP.W_KNIGHT, CP.W_ROOK],
    [CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
    [CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN],
    [CP.B_ROOK, CP.B_KNIGHT, CP.B_BISHOP, CP.B_KING, CP.B_QUEEN, CP.B_BISHOP, CP.B_KNIGHT, CP.B_ROOK]
];

describe('Testing for the chess library', () => {
    describe('Test resetting the board', () => {
        it('should set the game board to start condition', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            expect(game.board).deep.equal(boardStart);
        });
    });

    describe('Test getting potential moves', () => {
        it('should throw an error when getting potential moves for a piece not a pawn', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            let pawnCoord = new BoardCoordinate(0, 3);

            expect(() => {
                GetMoves(game, pawnCoord);
            }).to.throw();
        });

        it('should provide list of potential moves for a white pawn on edge of board', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            let pawnCoord = new BoardCoordinate(1, 0);
            let allowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(2, 0), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(3, 0), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(2, 1), CP.EMPTY)
            ];

            let moves = GetMoves(game, pawnCoord)
            expect(moves.length).to.equal(allowedMoves.length);
            expect(moves).to.have.same.deep.members(allowedMoves);
        });

        it('should provide list of potential moves for a black pawn on edge of board', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            let pawnCoord = new BoardCoordinate(6, 0);
            let allowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(5, 0), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(4, 0), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(5, 1), CP.EMPTY)
            ];

            let moves = GetMoves(game, pawnCoord)
            expect(moves.length).to.equal(allowedMoves.length);
            expect(moves).to.have.same.deep.members(allowedMoves);
        });

        it('should provide list of potential moves for a white pawn in middle of board', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            let pawnCoord = new BoardCoordinate(1, 3);
            let allowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(2, 3), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(3, 3), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(2, 2), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(2, 4), CP.EMPTY)
            ];

            let moves = GetMoves(game, pawnCoord)
            expect(moves.length).to.equal(allowedMoves.length);
            expect(moves).to.have.same.deep.members(allowedMoves);
        });

        it('should provide list of potential moves for a black pawn in middle of board', () => {
            let game = ResetBoard(new Game({ name: 'Test game' }));
            let pawnCoord = new BoardCoordinate(6, 3);
            let allowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(5, 3), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(4, 3), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(5, 2), CP.EMPTY),
                new Move(pawnCoord, new BoardCoordinate(5, 4), CP.EMPTY)
            ];

            let moves = GetMoves(game, pawnCoord)
            expect(moves.length).to.equal(allowedMoves.length);
            expect(moves).to.have.same.deep.members(allowedMoves);
        });

        it('should tell us when a piece would be captured', () => {
            const boardWCapture: CP[][] = [
                [CP.W_ROOK, CP.W_KNIGHT, CP.W_BISHOP, CP.W_KING, CP.W_QUEEN, CP.W_BISHOP, CP.W_KNIGHT, CP.W_ROOK],
                [CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN],
                [CP.EMPTY, CP.B_KING, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN],
                [CP.B_ROOK, CP.B_KNIGHT, CP.B_BISHOP, CP.EMPTY, CP.B_QUEEN, CP.B_BISHOP, CP.B_KNIGHT, CP.B_ROOK]
            ];

            let game = ResetBoard(new Game({ name: 'Test game' }));
            game.board = boardWCapture.slice();
            let pawnCoord = new BoardCoordinate(1, 2);
            let allowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(2, 1), CP.B_KING)
            ];

            let moves = GetMoves(game, pawnCoord);
            expect(moves).to.include.deep.members(allowedMoves);
        });

        it('should not let us capture same color piece', () => {
            const boardWCapture: CP[][] = [
                [CP.W_ROOK, CP.W_KNIGHT, CP.W_BISHOP, CP.W_KING, CP.W_QUEEN, CP.W_BISHOP, CP.W_KNIGHT, CP.W_ROOK],
                [CP.W_PAWN, CP.EMPTY, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN],
                [CP.EMPTY, CP.W_PAWN, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN],
                [CP.B_ROOK, CP.B_KNIGHT, CP.B_BISHOP, CP.B_KING, CP.B_QUEEN, CP.B_BISHOP, CP.B_KNIGHT, CP.B_ROOK]
            ];

            let game = ResetBoard(new Game({ name: 'Test game' }));
            game.board = boardWCapture.slice();
            let pawnCoord = new BoardCoordinate(1, 2);
            let disallowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(2, 1), CP.W_PAWN)
            ];

            let moves = GetMoves(game, pawnCoord);
            expect(moves).to.not.include.deep.members(disallowedMoves);
        });

        it('should not let us move to a non-empty spot', () => {
            const boardNonEmpty: CP[][] = [
                [CP.W_ROOK, CP.W_KNIGHT, CP.W_BISHOP, CP.W_KING, CP.W_QUEEN, CP.W_BISHOP, CP.W_KNIGHT, CP.W_ROOK],
                [CP.W_PAWN, CP.EMPTY, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN, CP.W_PAWN],
                [CP.EMPTY, CP.W_PAWN, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.B_PAWN, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY, CP.EMPTY],
                [CP.B_PAWN, CP.EMPTY, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN, CP.B_PAWN],
                [CP.B_ROOK, CP.B_KNIGHT, CP.B_BISHOP, CP.B_KING, CP.B_QUEEN, CP.B_BISHOP, CP.B_KNIGHT, CP.B_ROOK]
            ];

            let game = ResetBoard(new Game({ name: 'Test game' }));
            game.board = boardNonEmpty.slice();
            let pawnCoord = new BoardCoordinate(1, 2);
            let disallowedMoves: Move[] = [
                new Move(pawnCoord, new BoardCoordinate(3, 1), CP.B_PAWN)
            ];

            let moves = GetMoves(game, pawnCoord);
            expect(moves).to.not.include.deep.members(disallowedMoves);
        });
    });
});
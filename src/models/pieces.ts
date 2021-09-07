import mongoose from 'mongoose';

export enum ChessPiece {
    EMPTY,
    W_KING,
    W_QUEEN,
    W_ROOK,
    W_BISHOP,
    W_KNIGHT,
    W_PAWN,
    B_KING,
    B_QUEEN,
    B_ROOK,
    B_BISHOP,
    B_KNIGHT,
    B_PAWN
}

export class BoardCoordinate {
    row: number;
    column: number;

    constructor(row: number, column: number) {
        this.row = row;
        this.column = column;
    }
}
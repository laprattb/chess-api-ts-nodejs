import { IGame, Player, Move } from '../models/game';
import { ChessPiece, BoardCoordinate } from '../models/pieces';

// Fills the chess board with pieces for the initial game
// Coordinate 0,0 is the bottom left corner of the chess board
export function ResetBoard<T extends IGame>(game: T): T {
    for (var i = 0; i < 8; i++) {
        game.board[i] = [];
        for (var x = 0; x < 8; x++) {
            game.board[i][x] = ChessPiece.EMPTY;
        }
    }

    game.current_player = Player.WHITE;
    game.moves_counter = 0;

    // Set the initial piece placement
    SetBackRow(game, Player.WHITE);
    SetPawnRow(game, Player.WHITE);
    SetPawnRow(game, Player.BLACK);
    SetBackRow(game, Player.BLACK);

    return game;
}

export function MovePiece<T extends IGame>(game: T, moveFrom: BoardCoordinate, moveTo: BoardCoordinate): Move {
    let allowedMoves: Move[] = GetMoves(game, moveFrom);
    //let allowedCoordinates: BoardCoordinate[] = allowedMoves.map((val) => { return val.new_coordinate });
    let ret: Move;

    let mv = allowedMoves.filter(i => {
        if (i.new_coordinate.row == moveTo.row && i.new_coordinate.column == moveTo.column) return i;
    });

    if (getPlayerColor(game.board[moveFrom.row][moveFrom.column]) !== game.current_player) throw new Error("Not this players turn");
    if (mv == null || mv.length == 0) throw new Error("Move not allowed");

    // Move the piece
    let capturedPiece: ChessPiece = game.board[moveTo.row][moveTo.column];
    game.board[moveTo.row][moveTo.column] = game.board[moveFrom.row][moveFrom.column];
    game.board[moveFrom.row][moveFrom.column] = ChessPiece.EMPTY;
    ret = new Move(moveFrom, moveTo, capturedPiece);

    // Switch player, increment the round
    game.moves_counter++;
    if (game.current_player == Player.WHITE) {
        game.current_player = Player.BLACK;
    } else {
        game.current_player = Player.WHITE;
    }

    return ret;
}

// Get the potential moves of a piece on the chess board. The piece in question
// is specified by the row (r) and column (c).
export function GetMoves<T extends IGame>(game: T, coordinate: BoardCoordinate): Move[] {
    const { row, column } = coordinate;

    if (row < 0 || row > 8) throw new Error("Invalid row");
    if (column < 0 || column > 8) throw new Error("Invalid column");

    switch (game.board[row][column]) {
        case ChessPiece.W_PAWN:
        case ChessPiece.B_PAWN: {
            return GetPawnMoves(game, coordinate);
        }
        default: {
            throw new Error("Invalid move");
        }
    }
}

// Gets potential moves for a pawn piece
function GetPawnMoves<T extends IGame>(game: T, coordinate: BoardCoordinate): Move[] {
    const { row, column } = coordinate;
    const piece: ChessPiece = game.board[row][column];
    let player = Player.WHITE;
    if (piece == ChessPiece.B_PAWN) { player = Player.BLACK; }
    let ret: Move[] = [];

    const getDiagCoords = (): BoardCoordinate[] => {
        if (player == Player.WHITE) {
            return [
                { row: row + 1, column: column - 1 }, { row: row + 1, column: column + 1 }
            ];
        } else {
            return [
                { row: row - 1, column: column - 1 }, { row: row - 1, column: column + 1 }
            ];
        }
    }

    const getStraightCoords = (): BoardCoordinate[] => {
        let ret: BoardCoordinate[] = [];

        if (player == Player.WHITE) {
            ret.push({ row: row + 1, column: column });

            // Double move case
            if (row == 1) {
                ret.push({ row: row + 2, column: column });
            }
        } else {
            ret.push({ row: row - 1, column: column });

            // Double move case
            if (row == 6) {
                ret.push({ row: row - 2, column: column });
            }
        }

        return ret;
    }

    // First get diagonal captures
    let dcors = getDiagCoords();
    for (let i = 0; i < dcors.length; i++) {
        let dc = dcors[i];
        if (dc.row > 0 && dc.row < 8 && dc.column > 0 && dc.column < 8) {
            if (getPlayerColor(game.board[dc.row][dc.column]) != player) {
                ret.push(new Move(coordinate, dc, game.board[dc.row][dc.column]));
            }
        }
    }

    // Next get straight coordinates
    let scors = getStraightCoords();
    for (let i = 0; i < scors.length; i++) {
        let dc = scors[i];
        if (dc.row > 0 && dc.row < 8 && game.board[dc.row][dc.column] == ChessPiece.EMPTY) {
            if (game.board[dc.row][dc.column] == ChessPiece.EMPTY) {
                ret.push(new Move(coordinate, dc, game.board[dc.row][dc.column]));
            }
        }
    }

    return ret;
}

function getPlayerColor(piece: ChessPiece): Player {
    switch (piece) {
        case ChessPiece.W_KING:
        case ChessPiece.W_QUEEN:
        case ChessPiece.W_ROOK:
        case ChessPiece.W_BISHOP:
        case ChessPiece.W_KNIGHT:
        case ChessPiece.W_PAWN:
            return Player.WHITE;
        case ChessPiece.B_KING:
        case ChessPiece.B_QUEEN:
        case ChessPiece.B_ROOK:
        case ChessPiece.B_BISHOP:
        case ChessPiece.B_KNIGHT:
        case ChessPiece.B_PAWN:
            return Player.BLACK;
        default:
            return Player.NONE;

    }
}

// Sets a row as a back row
// ROOK,KNIGHT,BISHOP,KING,QUEEN,BISHOP,KNIGHT,ROOK
function SetBackRow<T extends IGame>(game: T, player: Player) {
    if (player == Player.WHITE) {
        game.board[0][0] = ChessPiece.W_ROOK;
        game.board[0][1] = ChessPiece.W_KNIGHT;
        game.board[0][2] = ChessPiece.W_BISHOP;
        game.board[0][3] = ChessPiece.W_KING;
        game.board[0][4] = ChessPiece.W_QUEEN;
        game.board[0][5] = ChessPiece.W_BISHOP;
        game.board[0][6] = ChessPiece.W_KNIGHT;
        game.board[0][7] = ChessPiece.W_ROOK;
    } else {
        game.board[7][0] = ChessPiece.B_ROOK;
        game.board[7][1] = ChessPiece.B_KNIGHT;
        game.board[7][2] = ChessPiece.B_BISHOP;
        game.board[7][3] = ChessPiece.B_KING;
        game.board[7][4] = ChessPiece.B_QUEEN;
        game.board[7][5] = ChessPiece.B_BISHOP;
        game.board[7][6] = ChessPiece.B_KNIGHT;
        game.board[7][7] = ChessPiece.B_ROOK;
    }
}

// Sets a pawn row
function SetPawnRow<T extends IGame>(game: T, player: Player) {
    if (player == Player.WHITE) {
        for (var i = 0; i < 8; i++) {
            game.board[1][i] = ChessPiece.W_PAWN;
        }
    } else {
        for (var i = 0; i < 8; i++) {
            game.board[6][i] = ChessPiece.B_PAWN;
        }
    }
}
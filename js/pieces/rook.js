import { FILES, PIECETYPE, SIDES } from '../globals.js';
import { Board } from '../board.js';
import { Piece } from './_piece.js';

/**
 * Rook
 */
export class Rook extends Piece {
    hasMoved = false;
    origCoord = [
        'a1', 'h1', 'a8', 'h8'
    ];
    value = 550;

    constructor(side) {
        super(side, PIECETYPE.rook);

        // init possible starting locations
        this._possibleMoves = this.origCoord;
    }

    canMove(board) {
        if(board instanceof Board) {
            this.active = true;
            this._possibleMoves = [];

            // can slide up-down-left-right until end of board
            this._possibleMoves = this._possibleMoves.concat(
                this.getPerpMoves(board, true, true),   // vertical up
                this.getPerpMoves(board, true, false),  // vertical down
                this.getPerpMoves(board, false, true),  // horizontal right
                this.getPerpMoves(board, false, false)  // horizontal left
            );
            
            return this._possibleMoves;
        }

        console.error("Rook.canMove: Invalid board");
        return false;
    }

    move(cell) {
        if(super.move(cell)) {
            if((cell.file != FILES.a && cell.file != FILES.h)
                || (this.side == SIDES.black && cell.rank != 8)
                || (this.side == SIDES.white && cell.rank != 1)) 
            {
                // team can no longer castle on this side
                this.hasMoved = true;
            }
        }

        return;
    }
}

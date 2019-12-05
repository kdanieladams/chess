import { SIDES, PIECETYPE } from '../globals.js';
import { Cell } from '../cell.js';

/**
 * Piece
 * 
 * Contains properties of a piece, and getters for making the enums make sense.
 * Functions as an abstract class for all the pieces.
 */
export class Piece {
    // public
    side = SIDES.white;
    type = PIECETYPE.pawn;

    // private
    _cell = null;
    _forward = -1;
    _possibleMoves = new Array();
    _slideDiag = false;
    _slideVertHoriz = false;
    
    constructor(side, type) {
        this.side = side;
        this.type = type;
        
        this._forward = this.side == SIDES.white ? -1 : 1; // -1 = up, 1 = down
        this._slideDiag = (this.type == PIECETYPE.bishop || this.type == PIECETYPE.queen);
        this._slideVertHoriz = (this.type == PIECETYPE.rook || this.type == PIECETYPE.queen);
    }

    canMove() {
        console.error("Piece.canMove: canMove has not been implemented!");
    }

    getCoord() {
        if(this._cell != null)
            return this._cell.getCoord();

        return "";
    }

    getPieceType() {
        return Object.keys(PIECETYPE)[this.type];
    }

    getSide() {
        return Object.keys(SIDES)[this.side];
    }

    move(cell) {
        // check if I can be moved to this cell...
        if(cell instanceof Cell && this._possibleMoves.includes(cell.getCoord())) {
            if(this._cell != null) 
                this._cell.piece = null;
            
            this._cell = cell;
            this._cell.piece = this;
            this._possibleMoves = [];
            this.moveEffects();

            return true;
        }

        return false;
    }

    moveEffects() {
        // console.error("Piece.moveEffects: moveEffects has not been implemented!");
        return;
    }
}
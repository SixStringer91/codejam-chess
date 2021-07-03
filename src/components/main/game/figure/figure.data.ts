import { ChessID, ChessFigures } from '../../../../enums/enums';
import horse from '../../../../assets/horse.svg';
import bishop from '../../../../assets/bishop.svg';
import pawn from '../../../../assets/pawn.svg';
import king from '../../../../assets/king.svg';
import queen from '../../../../assets/queen.svg';
import rook from '../../../../assets/rook.svg';

interface IMoveCheck {
  x: number;
  y: number;
}

export const figures = {
  KING: {
    name: ChessFigures.KING,
    pic: king,
    id: ChessID.K
  },
  QUEEN: {
    name: ChessFigures.QUEEN,
    pic: queen,
    id: ChessID.Q
  },
  HORSE: {
    name: ChessFigures.HORSE,
    pic: horse,
    id: ChessID.H,
    moveCheck(figure: IMoveCheck, square: IMoveCheck) {
      const dx = Math.abs(figure.x - square.x);
      const dy = Math.abs(figure.y - square.y);
      const check = (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
      if (check) return true;
      return false;
    }
  },
  BISHOP: {
    name: ChessFigures.BISHOP,
    pic: bishop,
    id: ChessID.B
  },
  PAWN: {
    name: ChessFigures.PAWN,
    pic: pawn,
    id: ChessID.P
  },
  ROOK: {
    name: ChessFigures.ROOK,
    pic: rook,
    id: ChessID.R,
    moveCheck(figure: IMoveCheck, square: IMoveCheck) {
      if (figure.x === square.x || figure.y === square.y) return true;
      return false;
    }
  }
};

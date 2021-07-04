import { ChessFigures } from '../../../../enums/enums';

interface IMoveCheck {
  x: number;
  y: number;
}

export const figures = {
  KING: {
    name: ChessFigures.KING,
    moveCheck(figure: IMoveCheck, square: IMoveCheck) {
      const check = (figure.x - square.x === 1
        || figure.x - square.x === -1
        || figure.x - square.x === 0)
        && (figure.y - square.y === 1
          || figure.y - square.y === -1
          || figure.y - square.y === 0);
      if (check) return true;
      return false;
    }
  },
  QUEEN: {
    name: ChessFigures.QUEEN,
    moveCheck(figure: IMoveCheck, square: IMoveCheck) {
      const check = ((Math.abs(figure.x - square.x))
        && Math.abs(figure.y - square.y))
        || figure.x === square.x
        || figure.y === square.y;
      if (check) return true;
      return false;
    }
  },
  HORSE: {
    name: ChessFigures.HORSE,
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
    moveCheck(figure: IMoveCheck, square: IMoveCheck) {
      const check = Math.abs(figure.x - square.x)
      === Math.abs(figure.y - square.y);
      if (check) return true;
      return false;
    }
  },
  PAWN: {
    name: ChessFigures.PAWN,
    moveCheck() {
      console.log('хуй');
    }
  },
  ROOK: {
    name: ChessFigures.ROOK,
    moveCheck(figure: IMoveCheck, square: IMoveCheck) {
      if (figure.x === square.x || figure.y === square.y) return true;
      return false;
    }
  }
};

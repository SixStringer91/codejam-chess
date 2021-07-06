import {
  ChessFigures,
  FigureColor,
  MagicNumbers
} from '../../../../enums/enums';

interface IMoveCheck {
  x: number;
  y: number;
}

const { BLACK, WHITE } = FigureColor;

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
    moveCheck(figure: IMoveCheck, square: IMoveCheck, color:FigureColor) {
      if (color === BLACK) {
        const check = (
          (square.y === figure.y + 1)
          || (figure.y === 1
          && square.y === figure.y + 2))
          && square.x === figure.x;
        if (check) return true;
      }
      if (color === WHITE) {
        const check = (
          (square.y === figure.y - 1)
          || (figure.y === MagicNumbers.gridSize - 2
            && square.y === figure.y - 2))
          && square.x === figure.x;
        if (check) return true;
      }
      return false;
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

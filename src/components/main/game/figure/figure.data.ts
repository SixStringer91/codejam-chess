import { ChessFigures } from '../../../../enums/enums';
import horse from '../../../../assets/horse.svg';
import bishop from '../../../../assets/bishop.svg';
import pawn from '../../../../assets/pawn.svg';
import king from '../../../../assets/king.svg';
import queen from '../../../../assets/queen.svg';
import rook from '../../../../assets/rook.svg';

const {
  KING, QUEEN, HORSE, BISHOP, PAWN, ROOK
} = {
  KING: {
    name: ChessFigures.KING,
    pic: king
  },
  QUEEN: {
    name: ChessFigures.QUEEN,
    pic: queen
  },
  HORSE: {
    name: ChessFigures.HORSE,
    pic: horse
  },
  BISHOP: {
    name: ChessFigures.BISHOP,
    pic: bishop
  },
  PAWN: {
    name: ChessFigures.PAWN,
    pic: pawn
  },
  ROOK: {
    name: ChessFigures.ROOK,
    pic: rook
  }
};

export const figuresArray = [
  {
    ...HORSE,
    startCoords: [1, 0]
  },
  {
    ...HORSE,
    startCoords: [6, 0]
  },
  {
    ...BISHOP,
    startCoords: [2, 0]
  },
  {
    ...BISHOP,
    startCoords: [5, 0]
  },
  {
    ...ROOK,
    startCoords: [0, 0]
  },
  {
    ...ROOK,
    startCoords: [7, 0]
  },
  {
    ...KING,
    startCoords: [3, 0]
  },
  {
    ...QUEEN,
    startCoords: [4, 0]
  },
  {
    ...PAWN,
    startCoords: [0, 1]
  },
  {
    ...PAWN,
    startCoords: [1, 1]
  },
  {
    ...PAWN,
    startCoords: [2, 1]
  },
  {
    ...PAWN,
    startCoords: [3, 1]
  },
  {
    ...PAWN,
    startCoords: [4, 1]
  },
  {
    ...PAWN,
    startCoords: [5, 1]
  },
  {
    ...PAWN,
    startCoords: [6, 1]
  },
  {
    ...PAWN,
    startCoords: [7, 1]
  }
];

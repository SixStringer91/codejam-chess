export enum MagicNumbers {
  gridSize = 8
}

export enum FigureColor {
  BLACK = '#FFC533',
  WHITE = '#E0ECF6'
}

export enum ChessFigures {
  HORSE = 'HORSE',
  KING = 'KING',
  ROOK = 'ROOK',
  BISHOP = 'BISHOP',
  QUEEN = 'QUEEN',
  PAWN = 'PAWN'
}

export const ChessIDBlack = {
  H: {
    color: FigureColor.BLACK,
    type: ChessFigures.HORSE
  },
  K: {
    color: FigureColor.BLACK,
    type: ChessFigures.KING
  },
  R: {
    color: FigureColor.BLACK,
    type: ChessFigures.ROOK
  },
  B: {
    color: FigureColor.BLACK,
    type: ChessFigures.BISHOP
  },
  Q: {
    color: FigureColor.BLACK,
    type: ChessFigures.QUEEN
  },
  P: {
    color: FigureColor.BLACK,
    type: ChessFigures.PAWN
  }
};

export const ChessIDWhite = {
  h: {
    color: FigureColor.WHITE,
    type: ChessFigures.HORSE
  },
  k: {
    color: FigureColor.WHITE,
    type: ChessFigures.KING
  },
  r: {
    color: FigureColor.WHITE,
    type: ChessFigures.ROOK
  },
  b: {
    color: FigureColor.WHITE,
    type: ChessFigures.BISHOP
  },
  q: {
    color: FigureColor.WHITE,
    type: ChessFigures.QUEEN
  },
  p: {
    color: FigureColor.WHITE,
    type: ChessFigures.PAWN
  }
};

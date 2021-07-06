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
    figure: ChessFigures.HORSE
  },
  K: {
    color: FigureColor.BLACK,
    figure: ChessFigures.KING
  },
  R: {
    color: FigureColor.BLACK,
    figure: ChessFigures.ROOK
  },
  B: {
    color: FigureColor.BLACK,
    figure: ChessFigures.BISHOP
  },
  Q: {
    color: FigureColor.BLACK,
    figure: ChessFigures.QUEEN
  },
  P: {
    color: FigureColor.BLACK,
    figure: ChessFigures.PAWN
  }
};

export const ChessIDWhite = {
  h: {
    color: FigureColor.WHITE,
    figure: ChessFigures.HORSE
  },
  k: {
    color: FigureColor.WHITE,
    figure: ChessFigures.KING
  },
  r: {
    color: FigureColor.WHITE,
    figure: ChessFigures.ROOK
  },
  b: {
    color: FigureColor.WHITE,
    figure: ChessFigures.BISHOP
  },
  q: {
    color: FigureColor.WHITE,
    figure: ChessFigures.QUEEN
  },
  p: {
    color: FigureColor.WHITE,
    figure: ChessFigures.PAWN
  }
};

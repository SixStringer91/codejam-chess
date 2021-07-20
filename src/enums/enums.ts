export enum MagicNumbers {
  GRID_SIZE = 8,
  HOUR = 60 * 60
}

export enum Members {
  PLAYER = 'PLAYER',
  OPPONENT = 'OPPONENT'
}

export enum GameModes {
  LOCAL_PVP = 'LOCAL_PVP',
  NETWORK_PVP = 'NETWORK_PVP',
  LOCAL_PVE = 'LOCAL_PVE'
}

export enum PopupMode {
  EDIT_NAME = 'EDIT_NAME',
  SHOW_WINNER = 'SHOW_WINNER'
}

export enum FigureColor {
  BLACK = '#FFC533',
  WHITE = '#E0ECF6'
}

export enum GridColor {
  WHITE = '#032b43',
  BLACK = '#870A30'
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

export enum SocketEvents {
  MOVE = 'MOVE',
  CHANGE_NAME = 'CHANGE_NAME',
  START = 'START',
  GAME_OWER = 'GAME_OWER',
  CLOSE = 'CLOSE'
}

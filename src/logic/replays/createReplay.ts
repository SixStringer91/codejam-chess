import { FigureColor } from '../../enums/enums';
import { IMove } from '../../interfaces/interfaces';
import { ReplayModel } from './replay.model';

const { WHITE, BLACK } = FigureColor;

export const createReplay = (
  moves: IMove, player:string, opponent:string, color:FigureColor
) => new ReplayModel(
  {
    name: color === WHITE ? player : opponent,
    moves: ReplayModel.createReplayMove(moves[WHITE])
  },
  {
    name: color === BLACK ? player : opponent,
    moves: ReplayModel.createReplayMove(moves[BLACK])
  }
);

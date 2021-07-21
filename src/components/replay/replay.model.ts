import { FigureColor } from '../../enums/enums';
import { IMoves, IReplay, IReplayMember } from '../../interfaces/interfaces';
import { ReplaysMove } from './move.model';

export class ReplayModel implements IReplay {
  [FigureColor.BLACK]: IReplayMember;

  [FigureColor.WHITE]: IReplayMember;

  constructor(WHITE: IReplayMember, BLACK: IReplayMember) {
    this[FigureColor.WHITE] = WHITE;
    this[FigureColor.BLACK] = BLACK;
  }

  static createReplayMove = (moves: IMoves[]) => moves.map(
    (move) => new ReplaysMove({
      prevPosition: move.prevPosition,
      position: move.position,
      time: move.time,
      type: move.type,
      color: move.color
    })
  );
}

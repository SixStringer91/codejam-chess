import { ChessFigures, FigureColor } from '../../enums/enums';
import { Coords } from '../../interfaces/types';

export class ReplaysMove {
  readonly prevPosition: Coords;

  readonly position: Coords;

  readonly time: number;

  readonly color: FigureColor;

  readonly type: ChessFigures;

  constructor({
    prevPosition, position, time, color, type
  }:ReplaysMove) {
    this.prevPosition = prevPosition;
    this.position = position;
    this.time = time;
    this.color = color;
    this.type = type;
  }
}

import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import mover from '../../../assets/mover.png';
import { FigureColor } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { figuresSVG } from '../game/figure/figures.img';
import { chessMark } from '../../../utils/square_directions';
import './player.stats.scss';
import { timeFormatHandle } from '../../../utils/timer.string-maker';

function PlayerStats(props: { color: FigureColor }) {
  const { color } = props;
  const currentMover = useSelector(
    (state: RootState) => state.userGrid.currentMover
  );
  const moves = useSelector((state:RootState) => state.userGrid.moves[color]);
  const gameCycle = useSelector((state:RootState) => state.userGrid.gameCycle);
  const isBLack = color === FigureColor.BLACK;

  const movesRender = useMemo(() => {
    if (gameCycle) {
      return moves.map((move) => (
        <div key={JSON.stringify(move)}>
          <svg
            viewBox={`${isBLack ? '15' : '-15'} 0 298 298`}
            className="figure"
            style={{
              width: '30px',
              height: 'auto'
            }}
          >
            <g>{figuresSVG[move.type]!(move.color)}</g>
          </svg>
          <span>
            {chessMark[move.prevPosition[0]]}
            {move.prevPosition[1] + 1}
            -
            {chessMark[move.position[0]]}
            {move.position[1] + 1}
          </span>
        </div>
      )).reverse();
    }
    return '';
  }, [moves, gameCycle]);

  const timeRender = useMemo(() => {
    if (gameCycle) {
      return moves
        .map((move) => (
          <div key={`time-${move.time}`}>
            <span>{timeFormatHandle(move.time)}</span>
          </div>
        ))
        .reverse();
    }
    return '';
  }, [moves, gameCycle]);

  const currentMoverLabel = useMemo(() => {
    if (gameCycle) {
      return (
        <div
          className="player-mover"
          style={{
            visibility: `${color === currentMover ? 'visible' : 'hidden'}`
          }}
        >
          <img src={mover} alt="mover" />
        </div>
      );
    }
    return '';
  }, [gameCycle, currentMover]);
  return (
    <div className="player-block">
      <div className="player-header">
        {currentMoverLabel}
        <span>J</span>
      </div>
      <div className="player-name">Danik</div>
      <div
        className="player-table"
        style={{ visibility: gameCycle ? 'visible' : 'hidden' }}
      >
        <div className="move-table">{movesRender}</div>
        <div className="move-table time-table">{timeRender}</div>
      </div>
    </div>
  );
}

export default PlayerStats;

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

  const isBLack = color === FigureColor.BLACK;

  const movesRender = useMemo(() => moves.map((move) => (
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
  )).reverse(), [moves]);

  const timeRender = useMemo(() => moves.map(
    (move) => (
      <div key={`time-${move.time}`}>
        <span>{timeFormatHandle(move.time)}</span>
      </div>
    )
  ).reverse(), [moves]);
  return (
    <div className="player-block">
      <div className="player-header">
        <div
          className="player-mover"
          style={{
            visibility: `${color === currentMover ? 'visible' : 'hidden'}`
          }}
        >
          <img src={mover} alt="mover" />
        </div>
        <span>J</span>
      </div>
      <div className="player-name">Danik</div>
      <div className="player-table">
        <div className="move-table">{movesRender}</div>
        <div className="move-table time-table">{timeRender}</div>
      </div>
    </div>
  );
}

export default PlayerStats;

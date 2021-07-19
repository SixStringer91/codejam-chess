import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mover from '../../../assets/mover.png';
import { FigureColor, PopupMode } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { figuresSVG } from '../game/figure/figures.img';
import { chessMark } from '../../../utils/square_directions';
import './player.stats.scss';
import { timeFormatHandle } from '../../../utils/timer.string-maker';
import { setPopup } from '../../../redux/reducers/popup.state';

function PlayerStats(props: { color: FigureColor; type: 'player' | 'enemy' }) {
  const { color, type } = props;
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.websockets[type]);
  const currentMover = useSelector(
    (state: RootState) => state.userGrid.currentMover
  );
  const moves = useSelector((state: RootState) => state.userGrid.moves[color]);
  const gameCycle = useSelector(
    (state: RootState) => state.websockets.gameCycle
  );
  const isBLack = color === FigureColor.BLACK;

  const movesRender = useMemo(() => {
    if (gameCycle) {
      return moves
        .map((move) => (
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
        ))
        .reverse();
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
            opacity: `${color === currentMover ? '1' : '0'}`
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
        <span>{name[0]?.toUpperCase()}</span>
      </div>
      <div
        onClick={() => {
          dispatch(setPopup({ isOpen: true, mode: PopupMode.EDIT_NAME }));
        }}
        className="player-name"
      >
        {name}
      </div>
      <div className="player-table" style={{ opacity: gameCycle ? '1' : '0' }}>
        <div className="move-table">{movesRender}</div>
        <div className="move-table time-table">{timeRender}</div>
      </div>
    </div>
  );
}

export default PlayerStats;

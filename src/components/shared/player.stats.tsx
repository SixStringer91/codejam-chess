import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import mover from '../../assets/mover.png';
import {
  FigureColor,
  GridColor,
  Members,
  PopupMode
} from '../../enums/enums';
import { RootState } from '../../redux/reducers';
import { figuresSVG } from './figures.img';
import { chessMark } from '../../utils/square_directions';
import './player.stats.scss';
import { timeFormatHandle } from '../../utils/timer.string-maker';
import { setPopup } from '../../redux/reducers/popup.state';
import { whatColor } from '../../utils/usefull_utils';
import editIMG from '../../assets/edit-icon.svg';

const { BLACK, WHITE } = GridColor;

function PlayerStats(props: { type: Members.PLAYER | Members.OPPONENT }) {
  const { type } = props;
  const dispatch = useDispatch();
  const name = useSelector((state: RootState) => state.websockets[type]);
  const isCycle = useSelector((state: RootState) => state.websockets.gameCycle);
  const playerColor = useSelector(
    (state: RootState) => state.websockets.playerColor
  );
  const currentMover = useSelector(
    (state: RootState) => state.userGrid.currentMover
  );
  const isPlayer = type === Members.PLAYER;
  const color = isPlayer ? playerColor : whatColor(playerColor);
  const moves = useSelector((state: RootState) => state.userGrid.moves[color]);
  const gameCycle = useSelector(
    (state: RootState) => state.websockets.gameCycle
  );

  const isBLack = color === FigureColor.BLACK;
  const bgColor = color === FigureColor.BLACK ? WHITE : BLACK;

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
      <div
        style={{
          background: `${isCycle ? bgColor : ''}`,
          color: `${isCycle ? color : ''}`
        }}
        className="player-header"
      >
        {currentMoverLabel}
        <span>{name[0]?.toUpperCase()}</span>
      </div>
      <div
        style={{
          background: `${isCycle ? bgColor : ''}`,
          color: `${isCycle ? color : ''}`
        }}
        className="player-name"
      >
        {name}
        {isPlayer && (
          <img
            style={{
              cursor: 'pointer',
              marginLeft: '5px'
            }}
            src={editIMG}
            alt="edit"
            onClick={() => {
              dispatch(setPopup({ isOpen: true, mode: PopupMode.EDIT_NAME }));
            }}
          />
        )}
      </div>
      <div
        className="player-table"
        style={{
          background: `${isCycle ? bgColor : ''}`,
          color: `${isCycle ? color : ''}`,
          opacity: gameCycle ? '1' : '0'
        }}
      >
        <div className="move-table">{movesRender}</div>
        <div className="move-table time-table">{timeRender}</div>
      </div>
    </div>
  );
}

export default PlayerStats;

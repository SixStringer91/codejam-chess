import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers/index';
import './game.style.scss';
import Figure from './figure/figure.component';
import Square from '../../shared/square.component';
import MoveSquare from '../../shared/move_square.component';
import {
  FigureColor,
  GameModes,
  PopupMode,
  SocketEvents
} from '../../../enums/enums';
import {
  generateFigures,
  generateMoves,
  generateSquares
} from '../../../logic/grid/elements.component-generators';
import { setPopup } from '../../../redux/reducers/popup.state';
import { createReplay } from '../../../logic/replays/createReplay';
import { saveReplay, setResultTable } from '../../../redux/reducers/grid.state';
import { IFigureProps, IReplayRes } from '../../../interfaces/interfaces';
import { setReplayCycleMove } from '../../../logic/replays/replay.cycle';

function Game() {
  const dispatch = useDispatch();
  const {
    chosenFigure, currentMover, grid, winner, moves
  } = useSelector(
    (state: RootState) => state.userGrid
  );

  const {
    PLAYER, OPPONENT, mode, playerColor, socket, gameCycle
  } = useSelector((state: RootState) => state.websockets);

  const currentReplay = useSelector(
    (state: RootState) => state.replays.currentReplay
  ) as IReplayRes;

  const speed = useSelector((state:RootState) => state.replays.speed);

  useEffect(() => {
    if (winner) {
      const replay = createReplay(moves, PLAYER, OPPONENT, playerColor);
      if (mode === GameModes.NETWORK_PVP && winner === playerColor) {
        dispatch(saveReplay(replay));
        socket?.send(
          JSON.stringify({
            payload: {
              event: SocketEvents.GAME_OWER,
              replay
            }
          })
        );
      } else {
        dispatch(setResultTable(replay));
      }
      dispatch(setResultTable(replay));
      dispatch(setPopup({ isOpen: true, mode: PopupMode.SHOW_WINNER }));
    }
  }, [winner]);

  useEffect(() => {
    if (mode === GameModes.REPLAY) {
      setReplayCycleMove(dispatch, currentReplay, currentMover, speed);
    }
  }, [currentMover, gameCycle]);

  const transformRotater = () => {
    if (mode === GameModes.NETWORK_PVP && playerColor === FigureColor.BLACK) {
      return 'rotate(0.5turn)';
    }
    if ((mode === GameModes.LOCAL_PVP
      || mode === GameModes.REPLAY) && currentMover === FigureColor.BLACK) {
      return 'rotate(0.5turn)';
    }
    return '';
  };

  const figuresList = useMemo(
    () => generateFigures(grid)
      .map((el) => <Figure {...el as IFigureProps} />), [grid]
  );

  const squaresList = generateSquares(grid).map((el) => <Square {...el} />);

  const canMoveList = useMemo(
    () => (chosenFigure ? generateMoves(grid, chosenFigure).map(
      (el) => <MoveSquare {...el} />
    ) : ''),
    [chosenFigure]
  );
  return (
    <div
      className="grid"
      style={{
        transform: transformRotater()
      }}
    >
      {figuresList}
      {squaresList}
      {canMoveList}
    </div>
  );
}

export default Game;

import { Dispatch } from 'redux';
import { FigureColor, GameModes, SocketEvents } from '../../enums/enums';
import { IReplayRes } from '../../interfaces/interfaces';
import {
  figureMove, gridReset, setChosenFigure, setCurrentMover, setTime
} from '../../redux/reducers/grid.state';
import { setConnection, setPlayerName, setReplayMode } from '../../redux/reducers/network.state';
import { setPopup } from '../../redux/reducers/popup.state';
import {
  removeReplayFirstElement, setCurrentReplay
} from '../../redux/reducers/replays.state';

const intervals = [1000, 2000, 3000, 4000];

export const startReplayCycle = (dispatch: Dispatch, replay: IReplayRes) => {
  dispatch(setCurrentReplay(JSON.stringify(replay)));
  dispatch(setPopup({ isOpen: false, mode: null }));
  dispatch(setReplayMode(replay));
  dispatch(setCurrentMover(FigureColor.WHITE));
};

export const setReplayCycleMove = (
  dispatch: Dispatch,
  replay: IReplayRes,
  currentMover: FigureColor,
  interval: 0 | 1 | 2 | 3
) => {
  const currentArray = replay[currentMover];
  const figure = currentArray.moves[0];
  const chosenFigure = {
    type: figure?.type,
    position: figure?.prevPosition,
    color: figure?.color
  };
  if (currentArray.moves.length) {
    dispatch(setChosenFigure(chosenFigure));
    setTimeout(() => {
      dispatch(setTime(60 * 60 - figure!.time));
      dispatch(figureMove(figure?.position));
      dispatch(removeReplayFirstElement(figure?.color));
    }, intervals[interval]);
  }
};
export const endGameButton = (
  dispatch:Dispatch,
  props:{socket:WebSocket | null,
    mode: GameModes }
) => {
  dispatch(setPopup({ isOpen: false, mode: null }));
  if (props.mode === GameModes.REPLAY) {
    dispatch(setPlayerName('Player1'));
  }
  if (props.socket) {
    props.socket.send(
      JSON.stringify({
        payload: {
          event: SocketEvents.CLOSE
        }
      })
    );
  } else {
    dispatch(gridReset());
    dispatch(setConnection(false));
  }
};

import { Dispatch } from 'redux';
import { FigureColor } from '../../enums/enums';
import { IReplayRes } from '../../interfaces/interfaces';
import {
  figureMove, setChosenFigure, setCurrentMover, setTime
} from '../../redux/reducers/grid.state';
import { setReplayMode } from '../../redux/reducers/network.state';
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

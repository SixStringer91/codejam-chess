import { Dispatch } from 'redux';
import { PopupMode, SocketEvents } from '../../enums/enums';
import { Coords } from '../../interfaces/types';
import {
  figureMove,
  setChosenFigure,
  setResultTable
} from '../reducers/grid.state';
import { setOpponentConnection } from '../reducers/network.state';
import { setPopup } from '../reducers/popup.state';

export const websocketMessagesHandler = (
  dispatch: Dispatch,
  msg: { event: SocketEvents; params: string|Coords|any }
) => {
  const { event, params } = msg;
  const { MOVE, START, GAME_OWER } = SocketEvents;

  switch (event) {
    case MOVE:
      dispatch(setChosenFigure(params.chosenFigure));
      dispatch(figureMove(params.dir));
      break;
    case START:
      dispatch(setOpponentConnection(msg));
      break;
    case GAME_OWER:
      dispatch(setResultTable(params));
      dispatch(setPopup({ isOpen: true, mode: PopupMode.SHOW_WINNER }));
      break;
    default:
      break;
  }
};

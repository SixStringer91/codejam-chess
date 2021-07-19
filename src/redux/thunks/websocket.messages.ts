import { Dispatch } from 'react';
import { SocketEvents } from '../../enums/enums';
import { figureMove, setChosenFigure } from '../reducers/grid.state';
import { setOpponentConnection } from '../reducers/network.state';

export const websocketMessagesHandler = (dispatch: Dispatch<any>, msg: any) => {
  const { event } = msg;
  const {
    MOVE, START, GAME_OWER
  } = SocketEvents;

  switch (event) {
    case MOVE:
      dispatch(setChosenFigure(msg.params.chosenFigure));
      dispatch(figureMove(msg.params.dir));
      break;
    case START:
      dispatch(setOpponentConnection(msg));
      break;
    case GAME_OWER:
     //
      break;
    default:
      break;
  }
};

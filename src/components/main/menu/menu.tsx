import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { RootState } from '../../../redux/reducers';
import './menu.style.scss';
import { GameModes } from '../../../enums/enums';
import { setGameMode, setGameCycle } from '../../../redux/reducers/grid.state';

function Menu() {
  const gameMode = useSelector((state: RootState) => state.userGrid.gameMode);
  const dispatch = useDispatch();
  const { LOCAL_PVP, NETWORK_PVP } = GameModes;

  const setOnline: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (gameMode === NETWORK_PVP) {
      dispatch(setGameMode(LOCAL_PVP));
    } else dispatch(setGameMode(NETWORK_PVP));
  };

  return (
    <div className="menu">
      <NavLink
        to="/game"
        onClick={() => dispatch(setGameCycle())}
        className="menu-btn"
      >
        <button
          type="button"
          onClick={setOnline}
          className="button-online"
          style={{ backgroundColor: gameMode === NETWORK_PVP ? '' : '#C38D9D' }}
        >
          {gameMode === NETWORK_PVP ? 'online' : 'offline'}
        </button>
        Start
        <button
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
          }}
          type="button"
          className="button-replays"
        >
          view replays
        </button>
      </NavLink>
    </div>
  );
}

export default Menu;

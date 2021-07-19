import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import { RootState } from '../../redux/reducers';
import './header.style.scss';
import Timer from './timer/timer';

function Header() {
  const gameCycle = useSelector((state:RootState) => state.websockets.gameCycle);

  const timerStart = useMemo(() => (gameCycle ? <Timer /> : ''), [gameCycle]);
  return (
    <div className="header">
      <div className="logo-block">
        <img alt="logo" className="logo" src={logo} />
        <img alt="title" className="title" src={title} />
      </div>
      {timerStart}
      <div className="admit-loss">таймер</div>
      <div className="toLobby">лобби</div>
      <NavLink to="/Game">Replay</NavLink>
      <NavLink to="/notGame">To Lobby</NavLink>
    </div>
  );
}

export default Header;

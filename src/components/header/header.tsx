// import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import './header.style.scss';
import Timer from './timer/timer';

function Header() {
  return (
    <div className="header">
      <div className="logo-block">
        <img alt="logo" className="logo" src={logo} />
        <img alt="title" className="title" src={title} />
      </div>
      <Timer />
      <div className="admit-loss">таймер</div>
      <div className="toLobby">лобби</div>
      {/* <NavLink to="/Game">Replay</NavLink>
      <NavLink to="/notGame">To Lobby</NavLink> */}
    </div>
  );
}

export default Header;

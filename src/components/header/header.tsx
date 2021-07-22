import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import logo from '../../assets/logo.svg';
import title from '../../assets/title.svg';
import { GameModes } from '../../enums/enums';
import { RootState } from '../../redux/reducers';
import './header.style.scss';
import ReplayHeader from './replay-header/replay-header';
import Timer from './timer/timer';

function Header() {
  const { gameCycle, mode } = useSelector(
    (state: RootState) => state.websockets
  );

  const timerStart = useMemo(
    () => (gameCycle && mode !== GameModes.REPLAY ? <Timer /> : ''),
    [gameCycle]
  );
  const replayPanel = useMemo(
    () => (gameCycle && mode === GameModes.REPLAY ? <ReplayHeader /> : ''),
    [gameCycle]
  );
  return (
    <div className="header">
      <div className="logo-block">
        <img alt="logo" className="logo" src={logo} />
        <img alt="title" className="title" src={title} />
      </div>
      {timerStart}
      {replayPanel}
    </div>
  );
}

export default Header;

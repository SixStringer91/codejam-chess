import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Game from './game/game';
import PlayerStats from '../shared/player-stats/player.stats';
import './main.style.scss';
import Menu from './menu/menu';
import { RootState } from '../../redux/reducers';
import { Members } from '../../enums/enums';

function Main() {
  const { gameCycle } = useSelector((state: RootState) => state.websockets);
  const routes = () => {
    if (gameCycle) {
      return (
        <Switch>
          <Route path="/game" component={Game} />
          <Redirect from="/" to="/game" />
        </Switch>
      );
    }
    return (
      <Switch>
        <Route path="/" component={Menu} />
        <Redirect from="/game" to="/" />
      </Switch>
    );
  };
  return (
    <div className="main">
      <PlayerStats type={Members.PLAYER} />
      <Switch>
        {routes()}
      </Switch>
      <PlayerStats type={Members.OPPONENT} />
    </div>
  );
}

export default Main;

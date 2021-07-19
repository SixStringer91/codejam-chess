import { useSelector } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import Game from './game/game';
import PlayerStats from './player_stats/player.stats';
import { FigureColor } from '../../enums/enums';
import './main.style.scss';
import Menu from './menu/menu';
import { RootState } from '../../redux/reducers';

const { WHITE, BLACK } = FigureColor;

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
      <PlayerStats type="player" color={WHITE} />
      <Switch>
        <Route exact path="/" component={Menu} />
        {routes()}
      </Switch>
      <PlayerStats type="enemy" color={BLACK} />
    </div>
  );
}

export default Main;

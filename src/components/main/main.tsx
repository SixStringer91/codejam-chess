import { Switch, Route } from 'react-router-dom';
import Game from './game/game';
import PlayerStats from './player_stats/player.stats';
import { FigureColor } from '../../enums/enums';
import './main.style.scss';
import Menu from './menu/menu';

const { WHITE, BLACK } = FigureColor;

function Main() {
  return (
    <div className="main">
      <PlayerStats color={WHITE} />
      <Switch>
        {/* <Route exact path="/" /> */}
        <Route path="/game" component={Game} />
        <Route path="/" component={Menu} />
      </Switch>
      <PlayerStats color={BLACK} />
    </div>
  );
}

export default Main;

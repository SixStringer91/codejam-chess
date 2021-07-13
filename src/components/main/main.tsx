import { Switch, Route } from 'react-router-dom';
import Game from './game/game';
import PlayerStats from './player_stats/player.stats';
import { FigureColor } from '../../enums/enums';
import './main.style.scss';

const { WHITE, BLACK } = FigureColor;

function Main() {
  return (
    <div className="main">
      <PlayerStats color={WHITE} />
      <Switch>
        {/* <Route exact path="/" /> */}
        <Route path="/" component={Game} />
        <Route path="/lobby" />
      </Switch>
      <PlayerStats color={BLACK} />
    </div>
  );
}

export default Main;

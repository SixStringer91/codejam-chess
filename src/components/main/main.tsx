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
  const isCycle = useSelector((state: RootState) => state.userGrid.gameCycle);
  return (
    <div className="main">
      <PlayerStats type="player" color={WHITE} />
      <Switch>
        <Route exact path="/" component={Menu} />
        {isCycle ? (
          <Route path="/game" component={Game} />
        ) : (
          <Redirect from="/game" to="/" />
        )}
      </Switch>
      <PlayerStats type="enemy" color={BLACK} />
    </div>
  );
}

export default Main;

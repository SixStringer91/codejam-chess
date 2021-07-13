import { useSelector } from 'react-redux';
import mover from '../../../assets/mover.png';
import { FigureColor } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import './player.stats.scss';

function PlayerStats(props: { color: FigureColor }) {
  const { color } = props;
  const { currentMover, moves: { [color]: moves } } = useSelector(
    (state: RootState) => state.userGrid
  );

  const movesRender = moves
    .map((figure) => <div key={JSON.stringify(figure)}>{figure.type}</div>);
    console.log(movesRender);

  return (
    <div className="player-block">
      <div className="player-header">
        <div
          className="player-mover"
          style={{
            visibility: `${color === currentMover ? 'visible' : 'hidden'}`
          }}
        >
          <img src={mover} alt="mover" />
        </div>
        <span>N</span>
      </div>
      <div className="player-name">Danik</div>
      <div className="player-table">
        <div className="move-table">{movesRender}</div>
        <div className="time-table" />
      </div>
    </div>
  );
}

export default PlayerStats;

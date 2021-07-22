import { useDispatch } from 'react-redux';
import { FigureColor, GridColor } from '../../../enums/enums';
import { IReplayRes } from '../../../interfaces/interfaces';
import { timeFormatHandle } from '../../../utils/timer.string-maker';
import ButtonPopup from '../button-popup/button.popup.component';
import winnerIMG from '../../../assets/winner-icon.png';
import { startReplayCycle } from '../../replay/replay.cycle';

const Replay = (props: IReplayRes) => {
  const { [FigureColor.BLACK]: BLACK, [FigureColor.WHITE]: WHITE } = props;
  const whiteIsWinner = WHITE.moves.length > BLACK.moves.length;
  const dispatch = useDispatch();
  const relaysResults = (() => {
    const { moves } = whiteIsWinner ? WHITE : BLACK;
    const { length } = moves;
    const summaryMoves = WHITE.moves.length + BLACK.moves.length;
    return {
      moves: summaryMoves,
      time: timeFormatHandle(moves[length - 1]!.time)
    };
  })();
  return (
    <div className="replay-content">
      <div
        className="player-header"
        style={{
          left: '-50px',
          top: '-50px',
          color: FigureColor.WHITE,
          backgroundColor: GridColor.WHITE,
          borderColor: FigureColor.WHITE
        }}
      >
        {WHITE.name[0]}
        <div
          style={{
            display: `${whiteIsWinner ? 'flex' : 'none'}`,
            left: '-15px',
            borderColor: FigureColor.WHITE
          }}
          className="winner-label"
        >
          <img src={winnerIMG} alt="" />
        </div>
      </div>
      <div className="vs-label">VS</div>
      <div
        className="player-header"
        style={{
          right: '-50px',
          top: '-50px',
          color: FigureColor.BLACK,
          backgroundColor: GridColor.BLACK,
          borderColor: FigureColor.BLACK
        }}
      >
        {BLACK.name[0]}
        <div
          style={{
            display: `${!whiteIsWinner ? 'flex' : 'none'}`,
            right: '-15px',
            borderColor: FigureColor.BLACK
          }}
          className="winner-label"
        >
          <img src={winnerIMG} alt="winner" />
        </div>
      </div>
      <div className="replay-body">
        <div>{`Moves: ${relaysResults.moves}`}</div>
        <div>{`Common Time: ${relaysResults.time}`}</div>
        <ButtonPopup
          text="Start Replay"
          styles={{ marginTop: '10px' }}
          cb={() => {
            startReplayCycle(dispatch, props);
          }}
        />
      </div>
    </div>
  );
};

export default Replay;

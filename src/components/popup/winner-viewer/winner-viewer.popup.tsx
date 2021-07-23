import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/reducers';
import Replay from '../replays/replay.component';
import ringsIMG from '../../../assets/rings.svg';

const WinnerViewer = () => {
  const replayTable = useSelector(
    (state:RootState) => state.userGrid.resultTable
  );

  return (
    <div className="popup-window">
      <div className="replays-wrapper" style={{ paddingTop: '45px' }}>
        { replayTable ? <Replay {...replayTable} /> : ringsIMG }
      </div>
    </div>
  );
};

export default WinnerViewer;

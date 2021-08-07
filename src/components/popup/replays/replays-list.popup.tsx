import { useDispatch, useSelector } from 'react-redux';
import { setPopup } from '../../../redux/reducers/popup.state';
import img from '../../../assets/rings.svg';
import { RootState } from '../../../redux/reducers';
import { replayListRender } from './replay.HOC-list';
import Replay from './replay.component';
import ButtonPopup from '../../shared/button-styled/button.styled.component';

const ReplaysViewer = () => {
  const dispatch = useDispatch();
  const replays = useSelector((state: RootState) => state.replays.replays);
  return (
    <div onClick={(e) => e.stopPropagation()} className="popup-window">
      <div className="replay-header">
        <div className="replays-count">
          {`Number of online games played: ${replays.length} `}
        </div>
        <ButtonPopup
          text="close"
          styles={{ marginTop: '10px' }}
          cb={(e) => {
            e.preventDefault();
            e.stopPropagation();
            dispatch(setPopup({ isOpen: false, mode: null }));
          }}
        />
      </div>
      <div className="replays-wrapper">
        {replays.length ? (
          replayListRender(Replay, replays).reverse()
        ) : (
          <img className="rings" src={img} alt="" />
        )}
      </div>
    </div>
  );
};

export default ReplaysViewer;

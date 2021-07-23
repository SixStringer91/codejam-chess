import { useDispatch, useSelector } from 'react-redux';
import { FigureColor } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { setReplaySpeed } from '../../../redux/reducers/replays.state';
import { intervals } from '../../../utils/usefull_utils';
import ButtonPopup from '../../shared/button.styled.component';

function ReplayHeader() {
  const interval = useSelector((state:RootState) => state.replays.speed);
  const dispatch = useDispatch();
  const speedHandler = (el: number) => {
    dispatch(setReplaySpeed(el));
  };
  const speedButtons = intervals.map((_, i) => (
    <ButtonPopup
      key={i}
      styles={{
        marginRight: '5px',
        backgroundColor: interval === i ? FigureColor.BLACK : ''
      }}
      text={`${i + 1}X`}
      cb={() => speedHandler(i)}
    />
  ));
  return (
    <div style={{ display: 'flex' }} className="replay-panel">
      {speedButtons}
    </div>
  );
}

export default ReplayHeader;

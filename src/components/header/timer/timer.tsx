import { useDispatch, useSelector } from 'react-redux';
import { TimeProps } from '../../../enums/enums';
import { RootState } from '../../../redux/reducers';
import { setTime } from '../../../redux/reducers/grid.state';
import { timeFormatHandle } from '../../../utils/timer.string-maker';

function Timer() {
  const timeInMinutes = useSelector((state: RootState) => state.userGrid.time);
  const dispatch = useDispatch();
  setTimeout(() => {
    if (timeInMinutes >= 0) {
      dispatch(setTime(timeInMinutes - 1));
    }
  }, 1000);
  return (
    <div className="timer">
      <div>Round Time:</div>
      <div>
        {
          timeInMinutes === TimeProps.HOUR_SEC
            ? '60:00'
            : timeFormatHandle(timeInMinutes)
        }
      </div>
    </div>
  );
}

export default Timer;

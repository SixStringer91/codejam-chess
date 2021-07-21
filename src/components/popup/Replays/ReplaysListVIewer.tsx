import { useDispatch } from 'react-redux';
import { setPopup } from '../../../redux/reducers/popup.state';
import img from '../../../assets/rings.svg';

const ReplaysViewer = () => {
  const dispatch = useDispatch();
  return (
    <div onClick={(e) => e.stopPropagation()} className="popup-window">
      <img src={img} alt="" />
      пока не трогайте, делаю))
      <button
        type="button"
        className="change-btn"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(setPopup({ isOpen: false, mode: null }));
        }}
      >
        Exit(not done)
      </button>
    </div>
  );
};

export default ReplaysViewer;

import { useDispatch, useSelector } from 'react-redux';
import { PopupMode } from '../../enums/enums';
import { RootState } from '../../redux/reducers';
import { setPopup } from '../../redux/reducers/popup.state';
import NameChange from './NameChanger/NameChanger';
import './popup.scss';
import WinnerViewer from './WinnerVIewer/WinnerViewer';

function Popup() {
  const isPopup = useSelector((state: RootState) => state.popup.isOpen);
  const mode = useSelector((state: RootState) => state.popup.mode);

  const dispatch = useDispatch();

  function popupSwitcher() {
    if (isPopup) {
      if (mode === PopupMode.EDIT_NAME) {
        return <NameChange />;
      }
      if (mode === PopupMode.SHOW_WINNER) {
        return <WinnerViewer />;
      }
    }
    return '';
  }

  return (
    <>
      {isPopup ? (
        <div
          onClick={() => {
            dispatch(setPopup({ isPopup: false, mode: null }));
          }}
          className="popup"
        >
          {popupSwitcher()}
        </div>
      ) : (
        ''
      )}
    </>
  );
}

export default Popup;

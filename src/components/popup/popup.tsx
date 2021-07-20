import { useSelector } from 'react-redux';
import { PopupMode } from '../../enums/enums';
import { RootState } from '../../redux/reducers';
import NameChange from './NameChanger/NameChanger';
import './popup.scss';
import WinnerViewer from './WinnerVIewer/WinnerViewer';

function Popup() {
  const isPopup = useSelector((state: RootState) => state.popup.isOpen);
  const mode = useSelector((state: RootState) => state.popup.mode);

  function popupSwitcher() {
    if (isPopup) {
      switch (mode) {
        case PopupMode.EDIT_NAME:
          return <NameChange />;
        case PopupMode.SHOW_WINNER:
          return <WinnerViewer />;
        default:
          break;
      }
    }
    return '';
  }

  return (
    <>
      {isPopup ? (
        <div
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

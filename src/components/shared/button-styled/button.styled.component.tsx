import React from 'react';

const ButtonPopup = (props: {
  text: string;
  cb: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  styles: React.CSSProperties;
}) => {
  const { text, cb, styles } = props;

  return (
    <button
      className="popup-btn"
      style={{ ...styles }}
      type="button"
      onClick={cb}
    >
      <span>{text}</span>
    </button>
  );
};

export default ButtonPopup;

import React from 'react';

function Figure(props: any) {
  const { pic, startCoords, name } = props;
  const setPosition = (coord) => `${(560 / 8) * coord}px`;
  return (
    <>
      <img
        id={name}
        style={{
          left: setPosition(startCoords[0]),
          top: setPosition(startCoords[1])
        }}
        className="figure"
        src={pic}
        alt="horse"
      />
    </>
  );
}

export default Figure;

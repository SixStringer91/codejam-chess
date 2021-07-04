import React from 'react';

interface IMoveSquareProps {
  coords: [x:number, y:number];
}

function MoveSquare(props: IMoveSquareProps) {
  const { coords } = props;
  const setPosition = (coord) => `${(560 / 8) * coord}px`;
  return (
    <>
      <div
        key={`can_move-${coords[0]}-${coords[1]}`}
        className="can_move"
        style={{
          left: setPosition(coords[0]),
          top: setPosition(coords[1])
        }}
      />
    </>
  );
}

export default MoveSquare;

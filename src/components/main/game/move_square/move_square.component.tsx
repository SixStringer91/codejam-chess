import React from 'react';
import { useDispatch } from 'react-redux';
import { figureMove } from '../../../../redux/reducers/grid.state';

interface IMoveSquareProps {
  coords: [x:number, y:number];
}

function MoveSquare(props: IMoveSquareProps) {
  const dispatch = useDispatch();
  const { coords } = props;
  const setPosition = (coord) => `${(560 / 8) * coord}px`;
  return (
    <>
      <div
        key={`can_move-${coords[0]}-${coords[1]}`}
        onClick={() => dispatch(figureMove(coords))}
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

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/reducers';

interface ISquareProps {
  coords: number[];
  chessMark: string;
  color: string;
}

function Square(props: ISquareProps) {
  const { chosenFigure } = useSelector((state: RootState) => state.userGrid);
  const { coords, chessMark, color } = props;
  const setPosition = (coord) => `${(560 / 8) * coord}px`;
  return (
    <>
      <div
        key={`${coords[0]}-${coords[1]}`}
        data-box={chessMark}
        className="chess-square"
        style={{
          backgroundColor: chosenFigure
          && chosenFigure.position[0] === coords[0]
          && chosenFigure.position[1] === coords[1] ? 'green' : color,
          left: setPosition(coords[1]),
          top: setPosition(coords[0])
        }}
      />

    </>
  );
}

export default Square;

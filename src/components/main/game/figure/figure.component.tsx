import React from 'react';
import { useDispatch } from 'react-redux';
import { setChosenFigure } from '../../../../redux/reducers/grid.state';

interface IFigureProps{
  pic:string,
  coords:number[],
  name:string
}

function Figure(props: IFigureProps) {
  const dispatch = useDispatch();
  const { pic, coords, name } = props;
  const setPosition = (coord) => `${(560 / 8) * coord}px`;
  const figureProps = {
    type: name,
    position: [coords[0], coords[1]]
  };
  return (
    <>
      <img
        onClick={() => dispatch(setChosenFigure({
          ...figureProps
        }))}
        id={name}
        style={{
          left: setPosition(coords[0]),
          top: setPosition(coords[1])
        }}
        className="figure"
        src={pic}
        alt="horse"
      />
    </>
  );
}

export default Figure;

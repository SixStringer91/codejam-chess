import React from 'react';
import { useDispatch } from 'react-redux';
import { setChosenFigure } from '../../../../redux/reducers/grid.state';
import { figuresSVG } from './figures.img';

interface IFigureProps{
  coords:number[],
  name:string,
  color: string
}

function Figure(props: IFigureProps) {
  const dispatch = useDispatch();
  const {
    coords,
    name,
    color
  } = props;

  const setPosition = (coord) => `${(560 / 8) * coord}px`;

  const figureProps = {
    type: name,
    position: [coords[0], coords[1]],
    color
  };
  const { left, top, fill } = {
    left: setPosition(coords[0]),
    top: setPosition(coords[1]),
    fill: color.toLowerCase()
  };
  return (
    <svg
      viewBox="-10 0 298 298"
      className="figure"
      style={{ left, top }}
      onClick={() => dispatch(setChosenFigure(figureProps))}
    >
      <g>
        {figuresSVG[name](fill)}
      </g>
    </svg>
  );
}

export default Figure;

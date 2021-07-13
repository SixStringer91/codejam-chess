import { useDispatch } from 'react-redux';
import { setChosenFigure } from '../../../../redux/reducers/grid.state';
import { figuresSVG } from './figures.img';
import { FigureColor } from '../../../../enums/enums';
import { IFigureProps } from '../../../../interfaces/interfaces';

const Figure = (props: IFigureProps) => {
  const dispatch = useDispatch();
  const {
    coords,
    name,
    color
  } = props;

  const setPosition = (coord:number) => `${(560 / 8) * coord}px`;

  const isBLack = color === FigureColor.BLACK;
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
      viewBox={`${isBLack ? '15' : '-15'} 0 298 298`}
      className="figure"
      style={{
        left,
        top,
        transform: isBLack ? 'rotate(0.5turn)' : ''
      }}
      onClick={() => dispatch(setChosenFigure(figureProps))}
    >
      <g>{figuresSVG[name]!(fill)}</g>
    </svg>
  );
};

export default Figure;

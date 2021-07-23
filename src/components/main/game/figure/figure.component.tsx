import { useDispatch, useSelector } from 'react-redux';
import { setChosenFigure } from '../../../../redux/reducers/grid.state';
import { figuresSVG } from '../../../shared/figures.img';
import { FigureColor, GameModes } from '../../../../enums/enums';
import { IFigureProps } from '../../../../interfaces/interfaces';
import { RootState } from '../../../../redux/reducers';

const Figure = (props: IFigureProps) => {
  const dispatch = useDispatch();
  const { coords, name, color } = props;

  const { mode, playerColor } = useSelector(
    (state: RootState) => state.websockets
  );

  const setPosition = (coord: number) => `${(560 / 8) * coord}px`;

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

  const figureHandler = () => {
    const check = mode === GameModes.LOCAL_PVP
    || (mode === GameModes.NETWORK_PVP && playerColor === color);
    if (check) dispatch(setChosenFigure(figureProps));
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
      onClick={figureHandler}
    >
      <g>{figuresSVG[name]!(fill)}</g>
    </svg>
  );
};

export default Figure;

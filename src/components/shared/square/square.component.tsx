import { useSelector } from 'react-redux';
import { GridProps } from '../../../enums/enums';
import { ISquareProps } from '../../../interfaces/interfaces';
import { RootState } from '../../../redux/reducers';

function Square(props: ISquareProps) {
  const { chosenFigure } = useSelector((state: RootState) => state.userGrid);
  const { coords, chessMark, color } = props;
  const setPosition = (
    coord:number
  ) => `${(GridProps.SQUARE_SIZE) * coord}px`;
  return (
    <>
      <div
        key={`${coords[0]}-${coords[1]}`}
        data-box={chessMark}
        className="chess-square"
        style={{
          backgroundColor: chosenFigure
          && chosenFigure.position[0] === coords[0]
          && chosenFigure.position[1] === coords[1] ? '#548c2f' : color,
          left: setPosition(coords[1]),
          top: setPosition(coords[0])
        }}
      />

    </>
  );
}

export default Square;

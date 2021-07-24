import { GridProps } from '../../../enums/enums';
import { Coords } from '../../../interfaces/types';
import bangIMG from '../../../assets/bang.svg';

function SquareShah(props: { coords: Coords }) {
  const { coords } = props;
  const setPosition = (coord: number) => `${GridProps.SQUARE_SIZE * coord}px`;
  return (
    <div
      key={`${coords[0]}-${coords[1]}-danger`}
      className="chess-square"
      style={{
        position: 'absolute',
        zIndex: 0,
        left: setPosition(coords[0]),
        top: setPosition(coords[1])
      }}
    >
      <img className="danger" src={bangIMG} alt="1" />
    </div>
  );
}

export default SquareShah;

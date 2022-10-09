import { FC } from 'react';
import { Col } from 'react-bootstrap';
import Card from './Card';
import { useAppSelector } from '../hooks/hooks';

interface Props {}

const CardsList: FC<Props> = ({}) => {
  const { filtered, isFavorite } = useAppSelector((state) => state.characters);

  if (isFavorite && filtered.length === 0)
    return (
      <Col md={12}>
        <h2 className={'text-center'}>You have no favorite cards</h2>
      </Col>
    );
  return (
    <>
      {filtered.map((char) => {
        return (
          <Col md={3} key={char.id}>
            <Card data={char} />
          </Col>
        );
      })}
    </>
  );
};

export default CardsList;

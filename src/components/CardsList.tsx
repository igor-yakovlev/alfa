import { FC } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { Character } from '../api/useCharacterApi';
import Card from './Card';
import { useSelector } from 'react-redux';

interface Props {
  isFavorite: boolean;
}

const CardsList: FC<Props> = ({ isFavorite }) => {
  const filtered = useSelector((state) => state.characters.filtered);

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

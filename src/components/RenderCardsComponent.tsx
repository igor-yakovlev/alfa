import { FC } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import { Character } from '../api/useCharacterApi';
import Card from './Card';

interface Props {
  data: Character[];
  onLiked: (data: Character) => void;
  onDelete: (id: number) => void;
  isFavorite: boolean;
}

const RenderCardsComponent: FC<Props> = ({ data, onLiked, onDelete, isFavorite }) => {
  if (isFavorite && data.length === 0)
    return (
      <Col md={12}>
        <h2 className={'text-center'}>You have no favorite cards</h2>
      </Col>
    );
  return (
    <>
      {data.map((char) => {
        return (
          <Col md={3} key={char.id}>
            <Card data={char} onLiked={onLiked} onDelete={onDelete} />
          </Col>
        );
      })}
    </>
  );
};

export default RenderCardsComponent;

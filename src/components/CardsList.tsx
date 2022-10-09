import { FC } from 'react';
import { Col } from 'react-bootstrap';
import Card from './Card';
import { useAppSelector } from '../hooks/hooks';

interface Props {}

const CardsList: FC<Props> = ({}) => {
  const { characters, isFavorite } = useAppSelector((state) => state.characters);
  const favoriteCharacters = characters
    .filter((it) => it.liked)
    .map((char) => {
      return (
        <Col md={4} xl={3} key={char.id}>
          <Card character={char} />
        </Col>
      );
    });

  if (isFavorite) {
    return (
      <>
        {favoriteCharacters.length ? (
          favoriteCharacters
        ) : (
          <Col md={12}>
            <h1 className={'text-center'}>No favourite cards</h1>
          </Col>
        )}
      </>
    );
  }
  return (
    <>
      {characters.map((char) => {
        return (
          <Col md={4} xl={3} key={char.id}>
            <Card character={char} />
          </Col>
        );
      })}
    </>
  );
};

export default CardsList;

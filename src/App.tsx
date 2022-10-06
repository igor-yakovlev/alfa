import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useCharacterApi } from './api/useCharacterApi';
import Card from './components/Card';
import Header from './components/Header';

interface Props {}

const App: FC<Props> = () => {
  const [characters, setCharacters] = useState([]);
  const [favorite, setFavorite] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const { findAll } = useCharacterApi();

  useEffect(() => {
    if (fetching) {
      findAll(currentPage)
        .then((res) => {
          setCharacters([...characters, ...res]);
          setCurrentPage((state) => state + 1);
        })
        .finally(() => setFetching(false));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  const onFavorite = (character) => {
    if (favorite.some((i) => i.id === character.id)) {
      setFavorite(favorite.filter((char) => char.id !== character.id));
    } else {
      setFavorite((prevState) => [...prevState, character]);
    }
  };

  const onDelete = (id) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };
  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} className='g-4 py-4'>
          {characters.map((char) => {
            return (
              <Col md={'3'} key={char.id}>
                <Card data={char} onFavorite={onFavorite} onDelete={onDelete} favorite={favorite} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default App;

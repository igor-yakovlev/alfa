import { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import { Character, useCharacterApi } from './api/useCharacterApi';
import Header from './components/Header';
import RenderCardsComponent from './components/RenderCardsComponent';
import UpButton from './components/UpButton';

interface Props {}

const App: FC<Props> = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [liked, setLiked] = useState<Character[]>([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const { findAll } = useCharacterApi();

  useEffect(() => {
    if (fetching && !isFavorite) {
      setIsLoading(true);
      findAll(currentPage)
        .then((res) => {
          setCharacters([...characters, ...res] as Character[]);
          setCurrentPage((state) => state + 1);
        })
        .finally(() => {
          setIsLoading(false);
          setFetching(false);
        });
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = ({ target }) => {
    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  const handleLiked = (character: Character) => {
    setCharacters((prevState) =>
      prevState.map((char) => {
        if (char.id === character.id) return { ...char, liked: character.liked ? false : true };
        return char;
      }),
    );
  };

  const handleFavorite = (isLiked: boolean) => {
    if (isLiked) {
      setIsFavorite(true);
      setLiked(characters.filter((char) => char.liked === true));
    } else {
      setIsFavorite(false);
    }
  };

  const handleDelete = (id: number) => {
    setCharacters(characters.filter((char) => char.id !== id));
  };

  return (
    <>
      <Header showFavorite={handleFavorite} />
      <Container>
        <Row xs={1} md={2} className='g-4 py-4'>
          <RenderCardsComponent
            data={isFavorite ? liked : characters}
            onLiked={handleLiked}
            onDelete={handleDelete}
            isFavorite={isFavorite}
          />
        </Row>
        {isLoading && (
          <Row>
            <Col md={12} className={'d-flex justify-content-center'}>
              <Spinner animation={'border'} />
            </Col>
          </Row>
        )}
      </Container>
      <UpButton/>
    </>
  );
};

export default App;

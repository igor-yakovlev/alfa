import { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Header from './Header';
import CardsList from './CardsList';
import { fetchCharacters } from '../store/characterSlice';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

interface Props {}

const App: FC<Props> = ({}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);

  const dispatch = useAppDispatch();
  const { loading, error, isFavorite, hasNextPage } = useAppSelector((state) => state.characters);

  useEffect(() => {
    if (fetching && !isFavorite && hasNextPage) {
      dispatch(fetchCharacters(currentPage + 1));
      setFetching(false);
      setCurrentPage((state) => state + 1);
    }
  }, [fetching, currentPage, isFavorite]);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLDocument;
    if (
      target.documentElement.scrollHeight -
        (target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      setFetching(true);
    }
  };

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} className='g-4 py-4'>
          <CardsList />
        </Row>
        {loading && (
          <Row>
            <Col md={12} className={'d-flex justify-content-center'}>
              <Spinner animation={'border'} />
            </Col>
          </Row>
        )}
        {error && (
          <Row>
            <Col md={12} className={'d-flex justify-content-center'}>
              <h2>Error occurred: {error}</h2>
            </Col>
          </Row>
        )}
        {!hasNextPage && (
          <Row>
          <Col md={12} className={'d-flex justify-content-center'}>
            <h2>No more pages</h2>
          </Col>
        </Row>
        )}
      </Container>
    </>
  );
};

export default App;

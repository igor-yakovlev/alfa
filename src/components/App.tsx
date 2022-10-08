import { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Header from './Header';
import CardsList from './CardsList';
import UpButton from './UpButton';
import { fetchCharacters } from '../store/characterSlice';
import { useAppDispatch, useAppSelector } from '../hooks';

interface Props {}

const App: FC<Props> = ({}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const dispatch = useAppDispatch();
  const { loading, error, isFavorite } = useAppSelector((state) => state.characters);

  useEffect(() => {
    if (fetching && !isFavorite) {
      dispatch(fetchCharacters(currentPage));
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
          <CardsList/>
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
      </Container>
      <UpButton />
    </>
  );
};

export default App;

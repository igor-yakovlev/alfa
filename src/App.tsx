import { FC, useEffect, useState } from 'react';
import { Col, Container, Row, Spinner } from 'react-bootstrap';
import Header from './components/Header';
import CardsList from './components/CardsList';
import UpButton from './components/UpButton';
import { fetchCharacters } from './store/characterSlice';
import { useDispatch, useSelector } from 'react-redux';

interface Props {}

const App: FC<Props> = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);

  const dispatch = useDispatch();
  const { status, error, isFavorite } = useSelector((state) => state.characters);
  
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
          <CardsList isFavorite={isFavorite} />
        </Row>
        {status === 'loading' && (
          <Row>
            <Col md={12} className={'d-flex justify-content-center'}>
              <Spinner animation={'border'} />
            </Col>
          </Row>
        )}
        {status === 'error' && (
          <Row>
            <Col md={12} className={'d-flex justify-content-center'}>
              <h2>Произошла ошибка</h2>
            </Col>
          </Row>
        )}
      </Container>
      <UpButton />
    </>
  );
};

export default App;

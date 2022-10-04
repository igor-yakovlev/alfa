import { FC, useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useCharacterApi } from './api/useCharacterApi';
import Card from './components/Card';
import Header from './components/Header';

interface Props {}

const App: FC<Props> = () => {
  const [characters, setCharacters] = useState([]);
  const { findAll } = useCharacterApi();

  useEffect(() => {
    findAll().then((res) => setCharacters(res));
  }, []);

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} className='g-4 py-4'>
          {characters.map((char) => {
            return (
              <Col md={'4'} key={char.id}>
                <Card data={char} />
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default App;

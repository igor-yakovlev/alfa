import React, { FC } from 'react';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Card from './components/Card';
import Header from './components/Header';

interface Props {}

const App: FC<Props> = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Container>
        <Row xs={1} md={2} className='g-4 py-4'>
          {Array.from({ length: 6 }).map((_, idx) => (
            <Col md={'3'}>
              <Card />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default App;

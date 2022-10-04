import type { FC } from 'react';
import { Col, Container, Row, Navbar } from 'react-bootstrap';
import Logo from '../assets/logo.svg';

interface Props {}

const Header: FC<Props> = () => {
  return (
    <header className={'bg-light border-bottom'}>
      <Container>
        <Row>
          <Col md={'auto'}>
            <Navbar.Brand href='/' className={'d-flex align-items-center'}>
              <img src={Logo} className='d-inline-block align-top' alt='React Bootstrap logo' />{' '}
              <h1 className='h2 '>Rick and Morty social network</h1>
            </Navbar.Brand>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

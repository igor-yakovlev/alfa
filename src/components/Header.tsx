import type { FC } from 'react';
import { Col, Container, Row, Navbar, Form } from 'react-bootstrap';
import Logo from '../assets/logo.svg';

interface Props {
  showFavorite: (isFavorite: boolean) => void;
}

const Header: FC<Props> = ({ showFavorite }) => {

  const handleChange = ({target}) => {
    showFavorite(target.checked);
  };

  return (
    <header className={'bg-light border-bottom'}>
      <Container>
        <Row>
          <Col md={'auto'}>
            <Navbar.Brand href='/' className={'d-flex align-items-center'}>
              <img src={Logo} className='d-inline-block align-top' alt='React Bootstrap logo' />{' '}
              <h1 className='h2'>RistagraM</h1>
            </Navbar.Brand>
          </Col>
          <Col md={{ span: 2, offset: 4 }} className={'my-auto'}>
            <Form.Check
              onChange={handleChange}
              className='fs-5 fw-bold text-success'
              type='switch'
              id='toggle-switch'
              label='Favorite'
            />
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

import type { BaseSyntheticEvent, FC } from 'react';
import { Col, Container, Row, Navbar, Form, Stack } from 'react-bootstrap';
import Logo from '../assets/logo.svg';
import styles from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { switchFavorite } from '../store/characterSlice';

interface Props {}

const Header: FC<Props> = ({}) => {
  const dispatch = useDispatch();

  const handleFavorite = ({ target }) => {
    if (target.checked) {
      dispatch(switchFavorite({isFavorite: true}));
    } else {
      dispatch(switchFavorite({isFavorite: false}));
    }
  };
  return (
    <header className={'bg-light border-bottom'}>
      <Container>
        <Row>
          <Col md={'auto'}>
            <Navbar.Brand href='/' className={'d-flex align-items-center'}>
              <Stack direction={'horizontal'} gap={2}>
                <img src={Logo} className='d-inline-block align-top' alt='React Bootstrap logo' />{' '}
                <h1 className={styles.title}>RistagraM</h1>
              </Stack>
            </Navbar.Brand>
          </Col>
          <Col md={{ span: 2, offset: 4 }} className={'my-auto'}>
            <Form.Check
              onChange={handleFavorite}
              className='fs-5 fw-bold'
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

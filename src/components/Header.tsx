import React from 'react';
import type { FC } from 'react';
import { Col, Container, Row, Navbar, Form, Stack } from 'react-bootstrap';
import Logo from '../assets/logo.svg';
import styles from './Header.module.scss';
import { useAppDispatch } from '../hooks';
import { switchFavorite } from '../store/characterSlice';

interface Props {}

const Header: FC<Props> = ({}) => {
  const dispatch = useAppDispatch();

  const handleFavorite = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target.checked;
    if (target) {
      dispatch(switchFavorite(true));
    } else {
      dispatch(switchFavorite(false));
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

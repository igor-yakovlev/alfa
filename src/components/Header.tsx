import React from 'react';
import type { FC } from 'react';
import { Col, Container, Row, Navbar, Form, Stack } from 'react-bootstrap';
import Logo from '../assets/logo.svg';
import styles from './Header.module.scss';
import { useAppDispatch } from '../hooks/hooks';
import { switchFavorite } from '../store/characterSlice';
import UpButton from './UpButton';

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
    <header className={'bg-light border-bottom sticky-top'}>
      <Container>
        <Row>
          <Col xs={6} md={'auto'}>
            <Navbar.Brand href='/index.html' className={'d-flex align-items-center'}>
              <Stack direction={'horizontal'} gap={2}>
                <img src={Logo} className={styles.logo} alt='logo'/>{' '}
                <h1 className={styles.title}>RistagraM</h1>
              </Stack>
            </Navbar.Brand>
          </Col>
          <Col xs={{ span: 2, offset: 1 }} md={{ span: 2, offset: 2 }} className={'my-auto'}>
            <Form.Check
              onChange={handleFavorite}
              className='fw-bold'
              type='switch'
              id='toggle-switch'
              label='Favorite'
            />
          </Col>
          <Col xs={12} md={{ span: 2, offset: 3 }} className={'my-auto'}>
            <UpButton/>
          </Col>
        </Row>
      </Container>
    </header>
  );
};

export default Header;

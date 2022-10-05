import { FC } from 'react';
import { Card as BootstrapCard, Stack, Row, Col } from 'react-bootstrap';
import { Character } from '../api/useCharacterApi';
import { Heart, Trash } from 'react-bootstrap-icons';
import styles from './Card.module.scss';

interface Props {
  data: Character;
}

const Card: FC<Props> = ({ data }) => {
  return (
    <BootstrapCard className={'shadow'}>
      <BootstrapCard.Img variant='top' src={data.image} />
      <BootstrapCard.Body>
        <BootstrapCard.Title className='fw-bold'>{data.name}</BootstrapCard.Title>
        <Row>
          <Col md={'6'}>
            <Stack direction={'horizontal'} gap={'3'}>
              <div>
                <div className='fw-bold'>Species</div>
                <span>{data.species}</span>
              </div>
              <div>
                <div className='fw-bold'>Status</div>
                <span>{data.status}</span>
              </div>
            </Stack>
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <Stack direction={'horizontal'} gap={'2'}>
              <Heart className={styles.pointer} size={'30px'} />
              <Trash className={styles.pointer} size={'30px'} />
            </Stack>
          </Col>
        </Row>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;

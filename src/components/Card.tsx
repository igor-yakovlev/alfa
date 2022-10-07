import { FC } from 'react';
import {
  Card as BootstrapCard,
  Stack,
  Row,
  Col,
  Tooltip,
  OverlayTrigger,
} from 'react-bootstrap';
import { Character } from '../api/useCharacterApi';
import { Heart, HeartFill, Trash } from 'react-bootstrap-icons';
import styles from './Card.module.scss';

interface Props {
  data: Character;
  onLiked: (data: Character) => void;
  onDelete: (id: number) => void;
}

const Card: FC<Props> = ({ data, onLiked, onDelete }) => {
  const handleLiked = () => {
    onLiked(data);
  };

  const handleDelete = () => {
    onDelete(data.id);
  };
  return (
    <BootstrapCard className={'shadow'}>
      <BootstrapCard.Img
        variant='top'
        src={data.image}
      />
      <BootstrapCard.Body>
        <OverlayTrigger
          placement='bottom'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>{data.name}</Tooltip>}
        >
          <BootstrapCard.Title className='fw-bold text-truncate'>{data.name}</BootstrapCard.Title>
        </OverlayTrigger>
        <Row>
          <Col md={'6'}>
            <Stack direction={'horizontal'} gap={3}>
              <div style={{ width: '80%' }}>
                <div className='fw-bold'>Species</div>
                <div className={'text-truncate'}>
                  <OverlayTrigger
                    placement='bottom'
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>{data.species}</Tooltip>}
                  >
                    <span>{data.species}</span>
                  </OverlayTrigger>
                </div>
              </div>
              <div>
                <div className='fw-bold'>Status</div>
                <div className={'text-truncate'}>
                  <span>{data.status}</span>
                </div>
              </div>
            </Stack>
          </Col>
          <Col md={{ span: 4, offset: 2 }}>
            <Stack direction={'horizontal'} gap={2}>
              <div onClick={handleLiked} className={styles.pointer}>
                {data.liked ? <HeartFill size={'30px'} /> : <Heart size={'30px'} />}
              </div>
              <div>
                <Trash onClick={handleDelete} className={styles.pointer} size={'30px'} />
              </div>
            </Stack>
          </Col>
        </Row>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;

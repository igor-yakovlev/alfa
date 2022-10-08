import { FC } from 'react';
import { Card as BootstrapCard, Stack, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Character } from '../store/characterSlice';
import { Heart, HeartFill, Trash } from 'react-bootstrap-icons';
import { handleLike, removeCharacter } from '../store/characterSlice';
import { useAppDispatch } from '../hooks';
import styles from './Card.module.scss';

interface Props {
  data: Character;
}

const Card: FC<Props> = ({ data }) => {
  const dispatch = useAppDispatch();
  const handleLiked = () => {
    dispatch(handleLike(data.id));
  };

  const handleDelete = () => {
    dispatch(removeCharacter(data.id));
  };

  return (
    <BootstrapCard className={'shadow'}>
      <BootstrapCard.Img variant='top' src={data.image} />
      <BootstrapCard.Body>
        <OverlayTrigger
          placement='bottom'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>{data.name}</Tooltip>}
        >
          <BootstrapCard.Title className='fw-bold text-truncate'>{data.name}</BootstrapCard.Title>
        </OverlayTrigger>
        <Row>
          <Col xs={'6'} md={'6'}>
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
          <Col xs={{ span: 4, offset: 2 }} md={{ span: 4, offset: 2 }} className={'my-auto'}>
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

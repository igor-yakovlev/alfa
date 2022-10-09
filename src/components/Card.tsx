import { FC } from 'react';
import { Card as BootstrapCard, Stack, Row, Col, Tooltip, OverlayTrigger } from 'react-bootstrap';
import { Character } from '../domain/character';
import { Heart, HeartFill, Trash } from 'react-bootstrap-icons';
import { likeCharacter, removeCharacter } from '../store/characterSlice';
import { useAppDispatch } from '../hooks/hooks';
import styles from './Card.module.scss';

interface Props {
  character: Character;
}

const Card: FC<Props> = ({ character }) => {
  const dispatch = useAppDispatch();
  const handleLike = () => {
    dispatch(likeCharacter(character.id));
  };

  const handleDelete = () => {
    dispatch(removeCharacter(character.id));
  };

  return (
    <BootstrapCard className={'shadow'}>
      <BootstrapCard.Img variant='top' src={character.image} />
      <BootstrapCard.Body>
        <OverlayTrigger
          placement='bottom'
          delay={{ show: 250, hide: 400 }}
          overlay={<Tooltip>{character.name}</Tooltip>}
        >
          <BootstrapCard.Title className='fw-bold text-truncate'>{character.name}</BootstrapCard.Title>
        </OverlayTrigger>
        <Row>
          <Col xs={'6'} md={'12'} xl={'6'}>
            <Stack direction={'horizontal'} gap={3}>
              <div style={{ width: '80%' }}>
                <div className='fw-bold'>Species</div>
                <div className={'text-truncate'}>
                  <OverlayTrigger
                    placement='bottom'
                    delay={{ show: 250, hide: 400 }}
                    overlay={<Tooltip>{character.species}</Tooltip>}
                  >
                    <span>{character.species}</span>
                  </OverlayTrigger>
                </div>
              </div>
              <div>
                <div className='fw-bold'>Status</div>
                <div className={'text-truncate'}>
                  <span>{character.status}</span>
                </div>
              </div>
            </Stack>
          </Col>
          <Col xs={{ span: 4, offset: 2 }} md={{ span: 6, offset: 1}} xl={{ span: 4, offset: 2}} className={'my-auto'}>
            <Stack direction={'horizontal'} gap={2}>
              <div onClick={handleLike} className={styles.pointer}>
                {character.liked ? <HeartFill size={'30px'} /> : <Heart size={'30px'} />}
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

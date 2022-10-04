import { FC } from 'react';
import { Card as BootstrapCard, ListGroup, Stack } from 'react-bootstrap';
import { Character } from '../api/useCharacterApi';

interface Props {
  data: Character;
}

const Card: FC<Props> = ({ data }) => {
  return (
    <BootstrapCard>
      <BootstrapCard.Img variant='top' src={data.image} />
      <BootstrapCard.Body>
        <BootstrapCard.Title className='fw-bold'>{data.name}</BootstrapCard.Title>
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
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;

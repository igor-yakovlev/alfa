import { FC } from 'react';
import { Card as BootstrapCard } from 'react-bootstrap';

interface Props {}

const Card: FC<Props> = ({}) => {
  return (
    <BootstrapCard>
      <BootstrapCard.Img variant='top' src='holder.js/100px160' />
      <BootstrapCard.Body>
        <BootstrapCard.Title>BootstrapCard title</BootstrapCard.Title>
        <BootstrapCard.Text>
          This is a longer card with supporting text below as a natural lead-in to additional
          content. This content is a little bit longer.
        </BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;
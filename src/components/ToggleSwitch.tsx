import { FC } from 'react';
import { Form } from 'react-bootstrap';

interface Props {
  
}

const ToggleSwitch: FC<Props> = ({}) => {
  const handleChange = ({ target }) => {};
  return (
    <Form.Check
      onChange={handleChange}
      className='fs-5 fw-bold text-success'
      type='switch'
      id='toggle-switch'
      label='Понравившеися'
    />
  );
};

export default ToggleSwitch;

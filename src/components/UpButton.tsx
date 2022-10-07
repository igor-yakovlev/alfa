import { FC, useEffect, useState } from 'react';
import { ArrowUp } from 'react-bootstrap-icons';
import styles from './UpButton.module.scss';

interface Props {}

const UpButton: FC<Props> = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  const scrollHandler = ({ target }) => {
    if (target.documentElement.scrollTop > 600) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>{isVisible && <ArrowUp size={'40px'} onClick={handleClick} className={styles.button} />}</>
  );
};

export default UpButton;

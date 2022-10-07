import { FC, useEffect, useState } from 'react';
import { ArrowUp } from 'react-bootstrap-icons';
import styles from './UpButton.module.scss';

interface Props {}

const UpButton: FC<Props> = ({}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScroll = ({ target }) => {
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
    <>
      {isVisible && (
        <div className={styles.button} onClick={handleClick}>
          <ArrowUp size={'40px'}/>
          <span>Back to up</span>
        </div>
      )}
    </>
  );
};

export default UpButton;

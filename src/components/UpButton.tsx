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

  const handleScroll: EventListener = (e: Event) => {
    const target = e.target as HTMLDocument;
    setIsVisible(target.documentElement.scrollTop > 600);
  };

  const handleClick = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  };

  return (
    <>
      {isVisible && (
        <div className={styles.button} onClick={handleClick}>
          <ArrowUp size={'2rem'} />
          <span>Back to up</span>
        </div>
      )}
    </>
  );
};

export default UpButton;

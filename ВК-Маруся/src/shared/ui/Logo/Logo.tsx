import React from 'react';
import { Link } from 'react-router-dom';
import SpriteIcon from '../SpriteIcon/SpriteIcon';
import styles from './Logo.module.scss';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  variant?: 'light' | 'dark';
}

export const Logo: React.FC<LogoProps> = ({ className, variant = 'light' }) => {
  const logoClasses = [styles.logo, variant === 'dark' ? styles['logo--dark'] : '', className || '']
    .filter(Boolean)
    .join(' ');

  return (
    <Link to="/" className={logoClasses} aria-label="Home">
      <SpriteIcon id="logo" className={styles.logo__icon} />
      <span className={styles.logo__text}>МАРУСЯ</span>
    </Link>
  );
};

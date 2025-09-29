import React from 'react';
import { socialLinks } from '@/shared/lib/constants/socialLinks';
import styles from './Footer.module.scss';
import SpriteIcon from '@/shared/ui/SpriteIcon/SpriteIcon';

export const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <ul className={styles.socials}>
          {(socialLinks || []).map((link) => (
            <li key={link.icon}>
              <a
                href={link.href}
                className={styles.socials__link}
                aria-label={`Мы в ${link.label}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <SpriteIcon id={link.icon} className={styles.socials__icon} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;

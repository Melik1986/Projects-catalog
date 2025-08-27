import React from 'react';
import SpriteIcon from '../../../../shared/ui/SpriteIcon/SpriteIcon';
import styles from './UserTabs.module.scss';

interface UserTabsProps {
  activeTab: 'favorites' | 'settings';
  onTabChange: (tab: 'favorites' | 'settings') => void;
}

const UserTabs: React.FC<UserTabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={styles['user-tabs']}>
      <button
        onClick={() => onTabChange('favorites')}
        className={`${styles['user-tabs__button']} ${
          activeTab === 'favorites' ? styles['user-tabs__button--active'] : ''
        }`}
      >
        <SpriteIcon id="heart" className={styles['user-tabs__icon']} />
        <span className={styles['user-tabs__text--mobile-hidden']}>Избранное</span>
      </button>
      <button
        onClick={() => onTabChange('settings')}
        className={`${styles['user-tabs__button']} ${
          activeTab === 'settings' ? styles['user-tabs__button--active'] : ''
        }`}
      >
        <SpriteIcon id="user" className={styles['user-tabs__icon']} />
        <span className={styles['user-tabs__text--mobile-hidden']}>Настройки</span>
      </button>
    </div>
  );
};

export default UserTabs;

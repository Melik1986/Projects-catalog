import React from 'react';
import type { UserProfile as UserProfileType } from '../../../Authentication/types/user';
import styles from './UserProfile.module.scss';

interface UserProfileProps {
  user: UserProfileType;
  onLogout: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const initials = `${user.name.charAt(0)}${user.surname.charAt(0)}`;

  return (
    <div className={styles['user-profile']}>
      <div className={styles['user-profile__card']}>
        <div className={styles['user-profile__field']} data-initials={initials}>
          <p className={styles['user-profile__description']}>Имя и фамилия</p>
          <h2 className={styles['user-profile__name']}>
            {user.name} {user.surname}
          </h2>
        </div>
        <div className={styles['user-profile__field']}>
          <p className={styles['user-profile__description']}>Электронная почта</p>
          <h2 className={styles['user-profile__email']}>{user.email}</h2>
        </div>
      </div>
      <button className={styles['user-profile__logout']} onClick={onLogout}>
        Выйти из аккаунта
      </button>
    </div>
  );
};

export default UserProfile;

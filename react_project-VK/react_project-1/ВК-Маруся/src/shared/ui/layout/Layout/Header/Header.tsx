import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import { SearchInput } from '@/modules/MovieSearch';
import { Logo } from '@/shared/ui/Logo/Logo';
import SpriteIcon from '@/shared/ui/SpriteIcon/SpriteIcon';
import { Modal } from '@/shared/ui';
import { LoginForm, RegisterForm, SuccessMessage } from '../../../../../modules/Authentication';
import { useHeader } from './hooks/useHeader';
import type { HeaderProps } from '@/shared/types';

const HeaderComponent: React.FC<HeaderProps> = ({ onSearch }) => {
  const {
    isAuthModalOpen,
    isAuthSuccess,
    authMode,
    isMobileSearchOpen,
    isAuth,
    user,
    openAuthModal,
    closeAuthModal,
    switchAuthMode,
    handleRegisterSuccess,
    handleLoginSuccess,
    handleSearchIconClick,
    closeMobileSearch,
    closeWithSuccess,
  } = useHeader();

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div
          className={`${styles.header__wrapper} ${isMobileSearchOpen ? styles['header__wrapper--search-open'] : ''}`}
        >
          <Logo className={styles.header__logo} />
          <nav className={styles.header__nav}>
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${styles.header__navlink} ${styles['header__navlink--home']} ${isActive ? styles['header__menuItem--active'] : ''}`
              }
            >
              Главная
            </NavLink>
            <NavLink
              to="/genres"
              className={({ isActive }) =>
                `${styles.header__navlink} ${styles['header__navlink--genres']} ${isActive ? styles['header__menuItem--active'] : ''}`
              }
            >
              Жанры
              <SpriteIcon id="genres" className={styles.header__genresIcon} />
            </NavLink>
            <div
              className={`${styles.header__searchInput} ${isMobileSearchOpen ? styles['header__searchInput--open'] : ''}`}
            >
              <SearchInput placeholder="Поиск" onSearch={onSearch} onClose={closeMobileSearch} />
              <div className={styles.header__searchIcon} onClick={handleSearchIconClick}>
                <SpriteIcon id="search" className={styles.header__searchIcon} />
              </div>
            </div>
          </nav>
          {isAuth && user ? (
            <NavLink
              to="/user"
              className={({ isActive }) =>
                `${styles.header__menu} ${styles.header__userName} ${isActive ? styles['header__menu--active'] : ''}`
              }
            >
              {user.surname}
              <SpriteIcon id="user" className={styles.header__userIcon} />
            </NavLink>
          ) : (
            <button
              onClick={openAuthModal}
              className={`${styles.header__menu} ${styles['header__menu--button']}`}
            >
              Войти
              <SpriteIcon id="user" className={styles.header__userIcon} />
            </button>
          )}
        </div>
      </div>
      <Modal open={isAuthModalOpen} onClose={closeAuthModal}>
        {isAuthSuccess ? (
          <SuccessMessage onClose={closeWithSuccess} />
        ) : authMode === 'login' ? (
          <LoginForm onSuccess={handleLoginSuccess} onSwitchMode={switchAuthMode} />
        ) : (
          <RegisterForm onSuccess={handleRegisterSuccess} onSwitchMode={switchAuthMode} />
        )}
      </Modal>
    </header>
  );
};

// Убираем мемоизацию для простого компонента
export const Header = HeaderComponent;

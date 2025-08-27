import React, { Suspense } from 'react';
import { ErrorBoundary } from '@/shared/lib/errors';
import SEO from '@/shared/ui/SEO/SEO';
import styles from './User.module.scss';
import { useUserPage, UserTabs, UserProfile } from '@/modules/UserProfile';
import { FavoritesList } from '@/modules/Favorites/components/FavoritesList/FavoritesList';
import { ErrorDisplay } from '@/shared/lib/errors/ErrorDisplay/ErrorDisplay';
import LoadingSpinner from '@/shared/ui/LoadingSpinner/LoadingSpinner';

const User: React.FC = () => {
  const { activeTab, handleTabChange, handleLogout, user, isAuth } = useUserPage();

  if (!isAuth || !user) {
    return null;
  }

  return (
    <>
      <SEO
        title="Профиль пользователя | ВК Маруся"
        description="Управляйте своим профилем, просматривайте избранные фильмы и персональные рекомендации."
        keywords="профиль пользователя, избранные фильмы, настройки аккаунта"
      />
      <main className={styles['user-page']}>
        <div className={styles['user-page__container']}>
          <UserTabs activeTab={activeTab} onTabChange={handleTabChange} />
          <div className={styles['user-page__content']}>
            <ErrorBoundary
              fallback={
                <Suspense fallback={<LoadingSpinner size="small" />}>
                  <ErrorDisplay message="Ошибка в профиле" />
                </Suspense>
              }
            >
              {activeTab === 'favorites' && <FavoritesList />}
              {activeTab === 'settings' && <UserProfile user={user} onLogout={handleLogout} />}
            </ErrorBoundary>
          </div>
        </div>
      </main>
    </>
  );
};

export default User;

import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '@/shared/ui/SEO/SEO';
import { ErrorDisplay } from '@/shared/lib/errors/ErrorDisplay';
import styles from './NotFound.module.scss';

const NotFound: React.FC = () => {
  const customActions = (
    <div className={styles.actions}>
      <Link to="/" className={styles.homeButton}>
        На главную
      </Link>
      <button className={styles.backButton} onClick={() => window.history.back()} type="button">
        Назад
      </button>
    </div>
  );

  return (
    <>
      <SEO
        title="Страница не найдена - 404 | ВК Маруся"
        description="Запрашиваемая страница не найдена. Вернитесь на главную страницу или воспользуйтесь навигацией."
        key="404, страница не найдена, ошибка, ВК Маруся"
      />
      <div className={styles.notFound}>
        <div className={styles.content}>
          <div className={styles.errorCode}>404</div>
          <ErrorDisplay
            title="Страница не найдена"
            message="К сожалению, запрашиваемая страница не существует или была перемещена."
            actions={customActions}
            size="large"
          />
        </div>
      </div>
    </>
  );
};

export default NotFound;

import React, { Suspense } from 'react';
import { Modal } from '../../../../shared/ui';
import { LoadingSpinner } from '../../../../shared/ui';
import styles from './TrailerModal.module.scss';
import modalStyles from '@/shared/ui/Modal/Modal.module.scss';

// Lazy loading для YouTube компонента - загружается только при открытии трейлера
const YouTubePlayer = React.lazy(() =>
  import('react-youtube').then((module) => ({
    default: ({ videoId, opts }: { videoId: string; opts: any }) => (
      <module.default videoId={videoId} opts={opts} />
    ),
  })),
);

interface TrailerModalProps {
  open: boolean;
  onClose: () => void;
  videoId: string | null;
}

// Константа для опций YouTube плеера для предотвращения ререндеров
const YOUTUBE_OPTS = {
  width: '100%',
  height: '100%',
  playerVars: {
    autoplay: 1,
    controls: 1,
    disablekb: 0,
    fs: 1,
    iv_load_policy: 3,
    modestbranding: 1,
    rel: 0,
    showinfo: 0,
    cc_load_policy: 0,
  },
} as const;

const TrailerModal: React.FC<TrailerModalProps> = ({ open, onClose, videoId }) => {
  if (!videoId) {
    return null;
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      className={modalStyles['modal--trailer']}
      closeOnBackdropClick={true}
    >
      <div className={styles.trailer}>
        <div className={styles.trailer__video}>
          <Suspense
            fallback={
              <div className={styles.trailer__loading}>
                <LoadingSpinner size="medium" text="Загрузка видеоплеера..." />
              </div>
            }
          >
            <YouTubePlayer videoId={videoId} opts={YOUTUBE_OPTS} />
          </Suspense>
        </div>
      </div>
    </Modal>
  );
};

TrailerModal.displayName = 'TrailerModal';
export default TrailerModal;

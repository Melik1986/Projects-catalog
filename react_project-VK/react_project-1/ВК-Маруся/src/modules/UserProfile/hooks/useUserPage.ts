import { useState, useLayoutEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/shared/lib/store';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../Authentication/store/authSlice';
import type { UserProfile } from '@/shared/types';

export const useUserPage = (): {
  activeTab: 'favorites' | 'settings';
  handleTabChange: (tab: 'favorites' | 'settings') => void;
  handleLogout: () => void;
  user: UserProfile | null;
  isAuth: boolean;
} => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useAppSelector((state) => state.auth.user);
  const isAuth = useAppSelector((state) => state.auth.isAuthenticated);

  const [activeTab, setActiveTab] = useState<'favorites' | 'settings'>('favorites');

  const handleTabChange = (tab: 'favorites' | 'settings'): void => {
    setActiveTab(tab);
  };

  const handleLogout = (): void => {
    dispatch(logoutUser());
    navigate('/auth');
  };

  useLayoutEffect(() => {
    if (!isAuth) {
      navigate('/');
    }
  }, [isAuth, navigate]);

  return { activeTab, handleTabChange, handleLogout, user, isAuth };
};


import React from 'react';
import { useLocation } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { UpgradeBanner } from '@/components/UpgradeBanner';

interface PageWrapperProps {
  children: React.ReactNode;
}

const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const { profile } = useAuth();
  const location = useLocation();

  const showBanner = profile && profile.user_status === 'free' && location.pathname !== '/upgrade-pro';

  return (
    <div>
      {children}
      {showBanner && <UpgradeBanner />}
    </div>
  );
};

export default PageWrapper;

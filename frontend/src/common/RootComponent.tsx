import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';

import { useHandleSocket } from 'hooks';
import { ROUTE } from './constants';
import { ErrorComponent } from './ErrorComponent';

interface FallbackProps {
  error: Error;
}

function handleFallbackError({ error }: FallbackProps) {
  return <ErrorComponent error={error} />;
}

export const RootComponent = () => {
  useHandleSocket();
  const { pathname } = useLocation();
  const nav = useNavigate();

  useEffect(() => {
    if (pathname === ROUTE.ROOT) nav(ROUTE.CHAT);
  }, [pathname, nav]);

  return (
    <ErrorBoundary fallbackRender={handleFallbackError}>
      <Outlet />
    </ErrorBoundary>
  );
};

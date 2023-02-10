import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { deleteAuthSignout } from 'services';
import { ROUTE } from 'common/constants';

export function useLogout() {
  const queryClient = useQueryClient();
  const nav = useNavigate();

  return async () => {
    await deleteAuthSignout();
    queryClient.invalidateQueries();
    queryClient.clear();
    nav(ROUTE.LOGIN);
  };
}

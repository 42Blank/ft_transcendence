import { useQueryClient } from 'react-query';

import { deleteAuthSignout } from 'services';

export function useLogout() {
  const queryClient = useQueryClient();

  return async () => {
    await deleteAuthSignout();
    queryClient.invalidateQueries();
    queryClient.clear();
  };
}

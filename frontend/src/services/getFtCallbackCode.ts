import axios from 'axios';

import { API } from 'common/constants';
import { FtError, isAxiosFtErrorResponse } from '../utils/error';

// TODO: refactor me!! - by ycha
interface FtProfile {
  id: string;
  username: string;
  image_url: string;
}

export async function getFtCallbackCode(code: string): Promise<FtProfile> {
  return axios
    .get<FtProfile>(`${process.env.REACT_APP_SERVER}${API.FT_AUTH_CALLBACK}?code=${code}`, {
      withCredentials: true,
    })
    .then(({ data }) => data)
    .catch((error: unknown) => {
      if (isAxiosFtErrorResponse(error)) {
        throw new FtError(error.response.data);
      }

      throw error;
    });
}

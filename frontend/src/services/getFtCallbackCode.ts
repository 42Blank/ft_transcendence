import { API } from 'common/constants';
import { FtProfileType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export async function getFtCallbackCode(code: string): Promise<FtProfileType> {
  return axiosGet<FtProfileType>(`${API.FT_AUTH_CALLBACK}?code=${code}`);
}

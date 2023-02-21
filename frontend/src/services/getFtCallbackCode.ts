import { API } from 'common/constants';
import { FtProfileType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export async function getFtCallbackCode(params: URLSearchParams): Promise<FtProfileType> {
  return axiosGet<FtProfileType>(API.FT_AUTH_CALLBACK, params);
}

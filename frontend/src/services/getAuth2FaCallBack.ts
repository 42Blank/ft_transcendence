import { API } from 'common/constants';
import { axiosGet } from './axiosWrapper';

export async function getAuth2FaCallBack(code: string): Promise<void> {
  return axiosGet<void>(`${API.AUTH_2FA_CALLBACK}?code=${code}`);
}

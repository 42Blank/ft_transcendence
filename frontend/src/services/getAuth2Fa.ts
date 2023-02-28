import { API } from 'common/constants';
import { axiosGet } from './axiosWrapper';

export async function getAuth2Fa(): Promise<void> {
  return axiosGet<void>(API.AUTH_2FA);
}

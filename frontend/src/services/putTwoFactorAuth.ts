import { API } from 'common/constants';
import { axiosPut } from './axiosWrapper';

export async function putTwoFactorAuth() {
  return axiosPut<void>(API.TWO_FACTOR_AUTH);
}

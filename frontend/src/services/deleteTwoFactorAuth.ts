import { API } from 'common/constants';
import { axiosDelete } from './axiosWrapper';

export async function deleteTwoFactorAuth() {
  return axiosDelete<void>(API.TWO_FACTOR_AUTH);
}

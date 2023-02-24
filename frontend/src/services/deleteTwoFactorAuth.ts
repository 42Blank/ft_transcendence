import { API } from 'common/constants';
import { axiosDelete } from './axiosWrapper';

export async function deleteTwoFactorAuth() {
  return axiosDelete<null>(API.GITHUB_SIGN_OUT);
}

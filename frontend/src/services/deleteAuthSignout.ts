import { API } from 'common/constants';
import { axiosDelete } from './axiosWrapper';

export async function deleteAuthSignout() {
  return axiosDelete<null>(API.SIGN_OUT);
}

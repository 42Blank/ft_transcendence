import { API } from 'common/constants';
import { axiosDelete } from './axiosWrapper';

export async function deleteAuthSignout() {
  const data = await axiosDelete(API.SIGN_OUT);

  return data;
}

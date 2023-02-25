import { API } from 'common/constants';
import { axiosGet } from './axiosWrapper';

export async function getFtCallbackCode(): Promise<void> {
  return axiosGet<void>(API.FT_AUTH_RANDOM);
}

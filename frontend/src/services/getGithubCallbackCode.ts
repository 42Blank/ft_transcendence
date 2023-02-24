import { API } from 'common/constants';
import { FtProfileType } from 'types/user';
import { axiosGet } from './axiosWrapper';

export async function getGithubCallbackCode(params: URLSearchParams): Promise<FtProfileType> {
  return axiosGet<FtProfileType>(API.GITHUB_AUTH_CALLBACK, params);
}

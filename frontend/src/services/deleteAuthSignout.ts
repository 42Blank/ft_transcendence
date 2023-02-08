import axios, { AxiosResponse } from 'axios';

import { API } from 'common/constants';

export function deleteAuthSignout(): Promise<void | AxiosResponse> {
  return axios
    .delete(`${process.env.REACT_APP_SERVER}${API.SIGN_OUT}`, {
      withCredentials: true,
    })
    .catch(() => {
      // TODO: 로그아웃 실패할 경우?
    });
}

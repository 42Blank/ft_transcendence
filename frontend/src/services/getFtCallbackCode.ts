import axios from 'axios';

import { API } from 'common/constants';

export function getFtCallbackCode(code: string) {
  return axios
    .get(`${process.env.REACT_APP_SERVER}${API.FT_AUTH_CALLBACK}?code=${code}`, {
      withCredentials: true,
    })
    .then(res => {
      return res;
    });
}

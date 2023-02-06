import axios from 'axios';
import { API } from 'common/constants';

export function getCurrentUserInfo(): unknown {
  return axios.get(process.env.REACT_APP_SERVER + API.USER).then(res => {
    console.log(res);
  });
}

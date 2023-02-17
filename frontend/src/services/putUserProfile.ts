import axios from 'axios';

import { API } from 'common/constants';

interface Props {
  nickname?: string;
  avatar?: string;
}

export function putUserProfile({ nickname, avatar }: Props): Promise<void> {
  return axios.put(`${process.env.REACT_APP_SERVER}${API.USER}`, { nickname, avatar });
}

import axios from 'axios';

import { API } from 'common/constants';

export async function deleteAuthSignout() {
  const data = await axios.delete(`${process.env.REACT_APP_SERVER}${API.SIGN_OUT}`);

  return data;
}

import axios from 'axios';
import { throwApiError } from 'utils/error';

export async function axiosGet<Type>(uri: string): Promise<Type> {
  return axios
    .get<Type>(`${process.env.REACT_APP_SERVER}${uri}`)
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosPost<bodyObjType, resType>(uri: string, reqData: bodyObjType): Promise<resType> {
  return axios
    .post<resType>(`${process.env.REACT_APP_SERVER}${uri}`, reqData)
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosPut<bodyObjType>(uri: string, reqData: bodyObjType): Promise<void> {
  return axios.put(`${process.env.REACT_APP_SERVER}${uri}`, reqData);
}

export async function axiosDelete(uri: string): Promise<void> {
  return axios.delete(`${process.env.REACT_APP_SERVER}${uri}`);
}

import axios from 'axios';
import { throwApiError } from 'utils/error';

export async function axiosGet<Type>(href: string): Promise<Type> {
  return axios
    .get<Type>(`${process.env.REACT_APP_SERVER}${href}`)
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosPost<bodyObjType, resType>(href: string, reqData: bodyObjType): Promise<resType> {
  return axios
    .post<resType>(`${process.env.REACT_APP_SERVER}${href}`, reqData)
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosPut<bodyObjType>(href: string, reqData: bodyObjType): Promise<void> {
  return axios.put(`${process.env.REACT_APP_SERVER}${href}`, reqData);
}

export async function axiosDelete(href: string): Promise<void> {
  return axios.delete(`${process.env.REACT_APP_SERVER}${href}`);
}

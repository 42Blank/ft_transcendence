import axios from 'axios';
import { throwApiError } from 'utils/error';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
  withCredentials: true,
  // transformResponse: ({ data }) => data,
  timeout: 1000,
}); // url, method, data 는 가져다 사용할 때 정의

export async function axiosGet<ResType>(uri: string, params?: URLSearchParams | string): Promise<ResType> {
  return axiosInstance
    .get<ResType>(uri, {
      params,
    })
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosPost<BodyObjType, ResType = void>(uri: string, reqData?: BodyObjType): Promise<ResType> {
  return axiosInstance
    .post<ResType>(uri, reqData)
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosPut<BodyObjType, ResType = void>(uri: string, reqData?: BodyObjType): Promise<ResType> {
  return axiosInstance
    .put<ResType>(uri, reqData)
    .then(({ data }) => data)
    .catch(throwApiError);
}

export async function axiosDelete<BodyObjType, ResType = void>(uri: string, reqData?: BodyObjType): Promise<ResType> {
  return axiosInstance
    .delete<ResType>(uri, reqData)
    .then(({ data }) => data)
    .catch(throwApiError);
}

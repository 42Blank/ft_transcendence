import { API } from 'common/constants';
import { axiosPost } from './axiosWrapper';

interface Params {
  file: File;
}

export async function postFile({ file }: Params): Promise<string> {
  return axiosPost<Params, string>(
    API.FILE_UPLOAD,
    { file },
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}

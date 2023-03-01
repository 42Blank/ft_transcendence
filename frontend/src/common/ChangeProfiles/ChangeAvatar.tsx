import { ChangeEvent } from 'react';

import { postFile } from 'services';
import { LOADING_IMAGE_URL } from 'common/constants';

import {
  changeAvatarImageStyle,
  changeAvatarImageUploadButtonStyle,
  changeProfileLabelStyle,
  changeProfileWrapperStyle,
} from './ChangeProfiles.styles';

interface Props {
  imageUrl: string;
  onChange: (newImageUrl: string) => void;
  className?: string;
}

export const ChangeAvatar = ({ imageUrl, onChange, className }: Props) => {
  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.files[0].size > 1024 * 1024 * 2) {
      alert(
        `2MB 이하 파일만 등록할 수 있습니다.\n\n현재파일 용량 : ${
          Math.round((e.currentTarget.files[0].size / 1024 / 1024) * 100) / 100
        }MB`,
      );
      return;
    }

    onChange(LOADING_IMAGE_URL);
    postFile({ file: e.currentTarget.files[0] }).then(res => {
      onChange(`${process.env.REACT_APP_SERVER}/file/${res}`);
    });
  }

  return (
    <div className={`${changeProfileWrapperStyle} ${className ?? ''}`}>
      <span className={changeProfileLabelStyle}>프로필 사진</span>
      <label htmlFor="change-image" className={changeAvatarImageUploadButtonStyle}>
        업로드
      </label>
      <input type="file" id="change-image" accept="image/jpeg, image/jpg, image/png" onChange={handleChangeImage} />
      <img src={imageUrl} alt="change profile" className={changeAvatarImageStyle} />
    </div>
  );
};

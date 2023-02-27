import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';

import { putUserProfile, postUserCheckDuplicateNickname, postFile } from 'services';
import { UserInfoType } from 'types/user';

import { tmpAvatarStyle } from './tmpAvatarStyle';

const sampleAvatarList = [
  {
    src: '/pochita_sample.png',
    alt: 'pochi',
  },
  {
    src: '/denji_sample.png',
    alt: 'denji',
  },
  {
    src: '/power_sample.jpg',
    alt: 'power',
  },
  {
    src: '/aki_sample.jpg',
    alt: 'aki',
  },
  {
    src: '/kobeni_sample.jpg',
    alt: 'kobeni',
  },
  {
    src: '/makima_sample.jpg',
    alt: 'makima',
  },
];

interface Props {
  onClickClose: () => void;
  user: UserInfoType;
  refetch: () => void;
}

interface ProfileObj {
  nickname?: string;
  avatar?: string;
}

const DEFAULT_IMAGE_URL = 'https://bit.ly/3YMBEvR';
const LOADING_IMAGE_URL = 'https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif';

export const EditProfileModal = ({ onClickClose, user: data, refetch }: Props) => {
  const inputNickRef = useRef<HTMLInputElement>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);

  useEffect(() => {
    if (inputNickRef.current.value === data.nickname) setIsValidated(true);
    setImageUrl(data.avatar);
  }, []);

  function handleChangeNickname(e: ChangeEvent<HTMLInputElement>) {
    const nickname = e.currentTarget.value;

    if (!nickname || nickname.length === 0) {
      setIsValidated(false);
      return;
    }

    if (e.currentTarget.value !== data.nickname) {
      postUserCheckDuplicateNickname({
        nickname: e.currentTarget.value,
      }).then(res => {
        setIsValidated(!res);
      });
    }
  }

  async function handleSubmitProfile() {
    const profileObj: ProfileObj = {};
    if (!isValidated || !inputNickRef.current.value || imageUrl === LOADING_IMAGE_URL) return;
    if (inputNickRef.current.value) profileObj.nickname = inputNickRef.current.value;
    profileObj.avatar = imageUrl;
    await putUserProfile(profileObj);
    refetch();
    onClickClose();
  }

  function handleChangeImage(e: ChangeEvent<HTMLInputElement>) {
    setImageUrl(LOADING_IMAGE_URL);
    postFile({ file: e.currentTarget.files[0] }).then(res => {
      setImageUrl(`${process.env.REACT_APP_SERVER}/file/${res}`);
    });
  }

  function handleClickImage(e: MouseEvent<HTMLElement>) {
    setImageUrl((e.target as HTMLInputElement).src);
  }

  return (
    <>
      <div>
        <label>Edit Profile</label>
        <br />
        <label htmlFor="nickname">Edit Nickname</label>
        <input
          type="text"
          id="nickname"
          defaultValue={data.nickname}
          placeholder="new nickname"
          ref={inputNickRef}
          required
          onChange={handleChangeNickname}
        />
        <input type="checkbox" checked={isValidated} readOnly />
        <br />
        <br />
        <label htmlFor="avatar">Edit Avatar</label>
        <input type="file" accept="image/*" id="avatar" onChange={handleChangeImage} />
        <img className={tmpAvatarStyle} src={imageUrl} alt="register-selected" />
      </div>
      <div>
        <p>Sample Avatar</p>
        {sampleAvatarList.map((value, index) => (
          <button key={index} type="button" onClick={handleClickImage}>
            <img className={tmpAvatarStyle} src={value.src} width={100} height={100} alt={value.alt} />
          </button>
        ))}
        <br />
        <button type="button" onClick={handleSubmitProfile}>
          <span>submit</span>
        </button>
      </div>
    </>
  );
};

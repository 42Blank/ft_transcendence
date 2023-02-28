import { FormEvent, useRef, useState } from 'react';

import { Button, ChangeAvatar, ChangeNickname, Modal } from 'common';
import { LOADING_IMAGE_URL, SAMPLE_IMAGE_LIST } from 'common/constants';
import { putUserProfile } from 'services';
import { checkInputRefValid } from 'utils';
import { useGetUser } from 'hooks';
import { SampleAvatarElement } from './SampleAvatarElement';

import {
  changeComponentStyle,
  editProfileFormTitleStyle,
  editProfileFormWrapperStyle,
  editProfileModalStyle,
  sampleAvatarListStyle,
} from './EditProfileSection.styles';

export const EditProfileSection = () => {
  const {
    data: { avatar, nickname },
    refetch,
  } = useGetUser();
  const [isModalShown, setIsModalShown] = useState<boolean>(false);
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const [newImageUrl, setNewImageUrl] = useState<string>(avatar);

  function handleClickModal() {
    setIsModalShown(true);
  }

  function handleClickClose() {
    setIsModalShown(false);
  }

  function handleChangeAvatar(imageUrl: string) {
    setNewImageUrl(imageUrl);
  }

  function handleSubmitProfile(e: FormEvent) {
    e.preventDefault();

    if (!checkInputRefValid(nicknameRef, 8)) return;
    if (newImageUrl === LOADING_IMAGE_URL) return;

    putUserProfile({ nickname: nicknameRef.current.value, avatar: newImageUrl }).then(() => {
      refetch();
      setIsModalShown(false);
    });
  }

  function handleClickSampleAvatar(imageUrl: string) {
    return () => {
      setNewImageUrl(imageUrl);
    };
  }

  return (
    <>
      <Button onClick={handleClickModal}>
        <span>프로필 편집</span>
      </Button>
      {isModalShown && (
        <Modal onClickClose={handleClickClose} className={editProfileModalStyle}>
          <form onSubmit={handleSubmitProfile} className={editProfileFormWrapperStyle}>
            <h3 className={editProfileFormTitleStyle}>프로필 수정</h3>
            <ChangeNickname
              nicknameRef={nicknameRef}
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              defaultNickname={nickname}
              className={changeComponentStyle}
            />
            <ChangeAvatar imageUrl={newImageUrl} onChange={handleChangeAvatar} className={changeComponentStyle} />
            <ul className={sampleAvatarListStyle}>
              {SAMPLE_IMAGE_LIST.map((image, index) => (
                <SampleAvatarElement
                  key={`sample-image-${index}`}
                  imageSrc={image.src}
                  alt={image.alt}
                  onClick={handleClickSampleAvatar(image.src)}
                />
              ))}
            </ul>
            <Button isSubmit>
              <span>제출</span>
            </Button>
          </form>
        </Modal>
      )}
    </>
  );
};

import { SyntheticEvent } from 'react';

import { UNKNOWN_IMAGE_URL } from 'common/constants';
import { COMMON_SIZES } from 'styles';

import { avatarImageStyle } from './Avatar.styles';

interface Props {
  userAvatar: string;
  alt?: string;
  size?: number;
  className?: string;
}
export const Avatar = ({ userAvatar, alt, size = COMMON_SIZES.ICON_LARGE, className }: Props) => {
  function handleImgError(e: SyntheticEvent<HTMLImageElement, Event>) {
    e.currentTarget.src = UNKNOWN_IMAGE_URL;
  }

  return (
    <img
      src={userAvatar ?? UNKNOWN_IMAGE_URL}
      alt={alt}
      width={size}
      height={size}
      className={`${avatarImageStyle} ${className ?? ''}`}
      onError={handleImgError}
    />
  );
};

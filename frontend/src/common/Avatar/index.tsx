import { FC, useState } from 'react';

import { avatarImageStyle } from './Avatar.styles';

interface Props {
  userAvatar: string;
  alt?: string;
  size?: number;
  className?: string;
}
export const Avatar: FC<Props> = ({ userAvatar, alt, size = 50, className = avatarImageStyle }) => {
  const [imgSrc, setImgSrc] = useState(userAvatar);
  function handleImgError() {
    setImgSrc('/unknown_user.png');
  }
  if (imgSrc === null) {
    setImgSrc('/unknown_user.png');
  }

  return <img src={imgSrc} alt={alt} width={size} height={size} className={className} onError={handleImgError} />;
};

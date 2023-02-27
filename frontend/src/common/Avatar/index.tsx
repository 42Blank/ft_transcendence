import { useState } from 'react';
import { avatarImageStyle } from './Avatar.styles';

interface Props {
  userAvatar: string | undefined;
  alt?: string | undefined;
  size: number | undefined;
  className?: string | undefined;
}
export const Avatar: React.FC<Props> = ({ userAvatar, alt, size = 50, className = avatarImageStyle }) => {
  const [imgSrc, setImgSrc] = useState(userAvatar);
  const handleImgError = () => {
    setImgSrc('/unknown_user.png');
  };
  if (imgSrc === null) {
    setImgSrc('/unknown_user.png');
  }

  return <img src={imgSrc} alt={alt} width={size} height={size} className={className} onError={handleImgError} />;
};

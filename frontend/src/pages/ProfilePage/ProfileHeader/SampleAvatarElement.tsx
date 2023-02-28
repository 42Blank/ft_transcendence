import { Button } from 'common';

import { sampleAvatarButtonWrapper, sampleAvatarWrapper } from './SampleAvatarElement.styles';

interface Props {
  imageSrc: string;
  alt: string;
  onClick: () => void;
}

export const SampleAvatarElement = ({ imageSrc, alt, onClick }: Props) => {
  return (
    <li className={sampleAvatarWrapper}>
      <Button onClick={onClick} className={sampleAvatarButtonWrapper}>
        <img src={imageSrc} alt={alt} width={50} height={50} />
      </Button>
    </li>
  );
};

import { ChangeEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_IMAGE_URL, LOADING_IMAGE_URL } from 'common/constants';
import { postFile } from 'services';

export function useRegister() {
  const nicknameRef = useRef<HTMLInputElement>(null);
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const [isValidated, setIsValidated] = useState<boolean>(false);
  const nav = useNavigate();
}

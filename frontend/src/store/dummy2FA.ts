import { atom } from 'recoil';

import { TwoFactorAuthType } from 'types/profile';

export const DUMMY_2FA = atom<TwoFactorAuthType>({
  key: 'dummy2fa',
  default: { isChecked: false },
});

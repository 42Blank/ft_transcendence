import * as bcrypt from 'bcryptjs';

export const pwEncryption = (pw: string): string => {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(pw, salt);
};

export const pwCompare = (pw: string, hash: string): boolean => {
  return bcrypt.compareSync(pw, hash);
};

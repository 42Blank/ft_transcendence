import { css } from '@emotion/css';
import { COLORS, makeBorder } from 'styles';

export const inputStyle = (maxLength: number) =>
  css({
    width: maxLength <= 8 ? 100 : 200,
    background: 0,
    border: 0,
    color: COLORS.WHITE,
    borderBottom: makeBorder({}),

    ':placeholder': {
      color: COLORS.GRAY3,
    },
  });

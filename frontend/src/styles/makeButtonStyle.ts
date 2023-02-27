import { COLORS } from './colorConstants';
import { makeBorder } from './makeBorder';
import { COMMON_SIZES } from './sizeConstants';

interface Params {
  paddingHorizontal?: number;
  paddingVertical?: number;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
  borderColor?: string;
}

export function makeButtonStyle({
  paddingHorizontal = 5,
  paddingVertical = 10,
  backgroundColor = COLORS.BLACK,
  hoverBackgroundColor = COLORS.GRAY3,
  borderColor = COLORS.WHITE,
}: Params) {
  return {
    backgroundColor,
    border: makeBorder({ color: borderColor }),
    borderRadius: COMMON_SIZES.BORDER_RADIUS_SMALL,
    padding: `${paddingHorizontal}px ${paddingVertical}px`,
    transition: 'background-color 0.2s ease-in',

    ':hover': {
      backgroundColor: hoverBackgroundColor,
      cursor: 'pointer',
    },
  };
}

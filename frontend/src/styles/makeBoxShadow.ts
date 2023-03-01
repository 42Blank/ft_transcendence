import { COLORS } from './colorConstants';

interface Params {
  offX?: number;
  offY?: number;
  blurRadius?: number;
  spreadRadius?: number;
  color?: string;
}

export function makeBoxShadow({
  offX = 0,
  offY = 0,
  blurRadius = 5,
  spreadRadius = 3,
  color = COLORS.BLACK_TRANSPARENT3,
}: Params) {
  return `${offX}px ${offY}px ${blurRadius}px ${spreadRadius}px ${color}`;
}

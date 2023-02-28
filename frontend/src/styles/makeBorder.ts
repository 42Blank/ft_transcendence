import { COLORS } from './colorConstants';

interface Params {
  width?: number;
  color?: string;
}

export function makeBorder({ width = 1, color = COLORS.WHITE }: Params) {
  return `${width}px solid ${color}`;
}

import { ReactNode } from 'react';

import { tooltipWrapper } from './Tooltip.styles';

interface Props {
  children: ReactNode;
  className?: string;
}

export const Tooltip = ({ children, className }: Props) => {
  return <div className={`${tooltipWrapper} ${className ?? ''}`}>{children}</div>;
}; // position: relative 인 부모와 함께 사용

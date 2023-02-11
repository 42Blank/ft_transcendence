import { tooltipWrapper } from './Tooltip.styles';

interface Props {
  text: string;
}

export const Tooltip = ({ text }: Props) => {
  return (
    <div className={tooltipWrapper}>
      <span>{text}</span>
    </div>
  );
}; // position: relative 인 부모와 함께 사용

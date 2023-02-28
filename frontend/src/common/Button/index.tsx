import { ReactNode } from 'react';
import { buttonWrapperStyle } from './Button.styles';

interface Props {
  children: ReactNode;
  isSubmit?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, isSubmit, className, onClick }: Props) => {
  if (isSubmit) {
    return (
      <button type="submit" className={`${buttonWrapperStyle} ${className}`}>
        {children}
      </button>
    );
  }
  return (
    <button type="button" onClick={onClick} className={`${buttonWrapperStyle} ${className}`}>
      {children}
    </button>
  );
};

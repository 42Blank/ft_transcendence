import { ReactNode } from 'react';
import { buttonWrapperStyle } from './Button.styles';

interface Props {
  children: ReactNode;
  type: 'submit' | 'button';
  className?: string;
  onClick?: () => void;
}

export const Button = ({ children, type, className, onClick }: Props) => {
  if (type === 'submit') {
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

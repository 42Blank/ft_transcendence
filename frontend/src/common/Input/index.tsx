import { ChangeEvent, MutableRefObject } from 'react';
import { inputStyle } from './Input.styles';

interface Props {
  isPassword?: boolean;
  maxLength?: number;
  placeholder?: string;
  inputRef?: MutableRefObject<HTMLInputElement>;
  defaultValue?: string;
  id?: string;
  value?: string;
  required?: boolean;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const Input = ({
  isPassword,
  maxLength = 8,
  placeholder = '',
  inputRef,
  defaultValue = '',
  id,
  value,
  required,
  onChange,
  className,
}: Props) => {
  if (value)
    return (
      <input
        type={isPassword ? 'password' : 'text'}
        maxLength={maxLength}
        placeholder={placeholder}
        defaultValue={defaultValue}
        id={id}
        value={value}
        required={required}
        onChange={onChange}
        className={`${inputStyle(maxLength)} ${className}`}
      />
    );
  return (
    <input
      type={isPassword ? 'password' : 'text'}
      maxLength={maxLength}
      placeholder={placeholder}
      ref={inputRef}
      defaultValue={defaultValue}
      id={id}
      required={required}
      onChange={onChange}
      className={`${inputStyle(maxLength)} ${className}`}
    />
  );
};

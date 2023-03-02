import { ArrowDownIcon } from 'assets';
import { Button } from 'common/Button';
import { useState } from 'react';

import {
  dropdownListInnerButtonStyle,
  dropdownListInnerStyle,
  dropdownListStyle,
  dropdownTopValueStyle,
  dropdownWrapperStyle,
} from './Dropdown.styles';

interface Props {
  currentKey: string;
  elements: { key: string; value: number | boolean }[];
  onChange: (value: number | boolean) => void;
  className?: string;
}

export const Dropdown = ({ currentKey, elements, onChange, className }: Props) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  function handleClickValue(value: number | boolean) {
    onChange(value);
    setIsDropdownShown(false);
  }

  function handleClickToggle() {
    setIsDropdownShown(prevState => !prevState);
  }

  return (
    <div className={`${dropdownWrapperStyle} ${className}`}>
      <button type="button" onClick={handleClickToggle} className={dropdownTopValueStyle(isDropdownShown)}>
        <span>{currentKey}</span>
        <ArrowDownIcon />
      </button>
      {isDropdownShown && (
        <ul className={dropdownListStyle(isDropdownShown)}>
          {elements.map(({ key, value }, index) => (
            <li key={`dropdown-${index}`} className={dropdownListInnerStyle}>
              <Button onClick={() => handleClickValue(value)} className={dropdownListInnerButtonStyle}>
                <span>{key}</span>
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

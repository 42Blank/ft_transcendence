import { ArrowDownIcon } from 'assets';
import { useState } from 'react';

import {
  dropdownListElementStyle,
  dropdownListStyle,
  dropdownTopValueStyle,
  dropdownWrapperStyle,
} from './Dropdown.styles';

interface Props {
  currentKey: string;
  elements: { key: string; value: number | boolean }[];
  onChange: (value: number | boolean) => void;
}

export const Dropdown = ({ currentKey, elements, onChange }: Props) => {
  const [isDropdownShown, setIsDropdownShown] = useState(false);

  function handleClickValue(value: number | boolean) {
    onChange(value);
    setIsDropdownShown(false);
  }

  function handleClickToggle() {
    setIsDropdownShown(prevState => !prevState);
  }

  return (
    <div className={dropdownWrapperStyle}>
      <button type="button" onClick={handleClickToggle} className={dropdownTopValueStyle(isDropdownShown)}>
        <span>{currentKey}</span>
        <ArrowDownIcon />
      </button>
      {isDropdownShown && (
        <ul className={dropdownListStyle(isDropdownShown)}>
          {elements.map(({ key, value }, index) => (
            <li key={`dropdown-${index}`} className={dropdownListElementStyle}>
              <button type="button" onClick={() => handleClickValue(value)}>
                <span>{key}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

"use client";

import { useState, useEffect, useRef } from "react";
import css from "./FilterDropdown.module.css";

interface Option {
  label: string;
  value: string;
}

interface FilterDropdownProps {
  label: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
}

export default function FilterDropdown({ label, options, value, onChange }: FilterDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Находим текст выбранной опции для отображения в кнопке
  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption ? selectedOption.label : label;

  // Закрытие дропдауна по клику вне его области
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (val: string) => {
    onChange(val);
    setIsOpen(false);
  };

  return (
    <div className={css.dropdownContainer} ref={dropdownRef}>
      <button
        type="button"
        className={`${css.dropdownButton} ${isOpen ? css.activeButton : ""}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {displayLabel}
        <svg className={`${css.arrowIcon} ${isOpen ? css.arrowUp : ""}`} width="16" height="16">
          <use href="/sprite.svg#icon-chevron-down"></use>
        </svg>
      </button>

      {isOpen && (
        <ul className={css.dropdownList}>
          {options.map((option) => (
            <li
              key={option.value}
              className={`${css.dropdownItem} ${option.value === value ? css.selectedItem : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

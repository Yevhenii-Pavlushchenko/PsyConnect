"use client";

import css from "./Button.module.css";
import Link from "next/link";

export type ButtonColor = "green" | "white";
export type ButtonSize = "large" | "small" | "zero"; // 🟢 Додали zero

interface ButtonProps {
  text: string;
  color: ButtonColor;
  width: number;
  size?: ButtonSize;
  onClick?: () => void;
  className?: string;
  icon?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  disabled?: boolean;
  noBorder?: boolean;
  fontSize?: number; // 🟢 НАШ НОВИЙ ПРОП ДЛЯ РОЗМІРУ ШРИФТУ
}

export default function Button({
  text,
  color,
  width,
  size = "large",
  onClick,
  className,
  icon,
  type,
  href,
  target,
  disabled,
  noBorder = false,
  fontSize, // 🟢 Деструктуризуємо
}: ButtonProps) {
  
  const btnClassName = `${css.btn} ${css[color]} ${css[size]} ${
    noBorder ? css.noBorder : ""
  } ${className || ""}`;
  
  // 🟢 Додаємо fontSize в інлайнові стилі, якщо він переданий
  const btnStyle = { 
    width: `${width}px`,
    ...(fontSize && { fontSize: `${fontSize}px` })
  };

  const content = (
    <>
      {icon && (
        <svg className={css.btnIcon} width="24" height="24">
          <use href={`/sprite.svg#${icon}`}></use>
        </svg>
      )}
      {text}
    </>
  );

  if (href) {
    return (
      <Link
        href={href}
        target={target}
        className={btnClassName}
        style={btnStyle}
        rel={target === "_blank" ? "noopener noreferrer" : undefined}
      >
        {content}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={btnClassName}
      style={btnStyle}
      disabled={disabled}
    >
      {content}
    </button>
  );
}

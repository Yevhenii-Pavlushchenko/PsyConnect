"use client";

import css from "./Button.module.css";
import Link from "next/link";

export type ButtonColor = "green" | "white";
export type ButtonSize = "large" | "small"; // Добавили новый тип

interface ButtonProps {
  text: string;
  color: ButtonColor;
  width: number;
  size?: ButtonSize; // Сделали необязательным (по умолчанию будет large)
  onClick?: () => void;
  className?: string;
  icon?: string;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
}

export default function Button({
  text,
  color,
  width,
  size = "large", // Значение по умолчанию
  onClick,
  className,
  icon,
  type,
  href,
  target,
}: ButtonProps) {
  // Добавляем класс размера в общую строку классов
  const btnClassName = `${css.btn} ${css[color]} ${css[size]} ${className || ""}`;
  const btnStyle = { width: `${width}px` };

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
    >
      {content}
    </button>
  );
}

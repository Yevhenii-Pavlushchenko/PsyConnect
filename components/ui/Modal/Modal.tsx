"use client";

import { useEffect } from "react";
import css from "./Modal.module.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  padding?: string | number;
  maxWidth?: string | number;
  maxHeight?: string | number; // 🔴 Новый проп для ограничения высоты окна
  className?: string;
}

export default function Modal({ 
  isOpen, 
  onClose, 
  children,
  padding,
  maxWidth,
  maxHeight,
  className = ""
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={css.overlay} onClick={onClose}>
      <div 
        className={`${css.modal} ${className}`} 
        onClick={(e) => e.stopPropagation()}
        style={{
          padding: padding !== undefined ? padding : undefined,
          maxWidth: maxWidth !== undefined ? maxWidth : undefined,
          maxHeight: maxHeight !== undefined ? maxHeight : undefined, 
        }}
      >
        <button className={css.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="20" height="20">
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
        {children}
      </div>
    </div>
  );
}

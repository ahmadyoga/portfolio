"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./Overlay.module.css";

type OverlayProps = {
  onClose: () => void;
  children: React.ReactNode;
};

export default function Overlay({ onClose, children }: OverlayProps) {
  const [visible, setVisible] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => setVisible(true));
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
      cancelAnimationFrame(raf);
    };
  }, [onClose]);

  return createPortal(
    <div className={styles.backdrop} data-visible={visible} onClick={onClose}>
      <button
        type="button"
        className={styles.closeButton}
        onClick={onClose}
        ref={closeRef}
        aria-label="Close"
      >
        ✕
      </button>
      <div
        className={styles.panel}
        data-visible={visible}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

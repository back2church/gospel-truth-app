import React, { useEffect, useRef } from 'react';

export function Modal({ onClose, label, children, className = '' }: {
  onClose: () => void;
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={ref} aria-label={label} onCancel={(event) => { event.preventDefault(); onClose(); }}
    className={`fixed m-auto w-[calc(100%-2rem)] rounded-3xl border border-slate-200 p-0 shadow-2xl overflow-y-auto ${className}`}>
    {children}
  </dialog>;
}

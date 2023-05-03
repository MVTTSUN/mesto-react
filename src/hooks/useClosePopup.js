import { useEffect } from "react";

export default function useClosePopup(isOpen, onClose) {
  useEffect(() => {
    if (!isOpen) return;

    const isOverlay = (evt) => {
      if (evt.target.classList.contains('popup')) {
        onClose();
      }
    };

    const handleEscClose = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscClose);
    document.addEventListener('mousedown', isOverlay)

    return () => {
      document.removeEventListener('keydown', handleEscClose);
      document.removeEventListener('mousedown', isOverlay);
    }
  }, [isOpen, onClose])
}
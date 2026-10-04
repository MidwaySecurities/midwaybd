'use client'
import { useEffect } from 'react';
import { useModalClose } from '../close-button-provider';

export default function HomeClientWrapper({ children }) {
  const { isModalOpen } = useModalClose();

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="md:hidden">
      {children}
    </div>
  );
}

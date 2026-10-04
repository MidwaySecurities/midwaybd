// components/Portal.js
'use client'
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

const DeletePortal = ({ children }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  const portalElement = document.querySelector('#delete-modal');

  if (!portalElement) {
    console.error(`Portal target element with selector "delete-modal" not found.`);
    return null;
  }

  return createPortal(children, portalElement);
};

export default DeletePortal;
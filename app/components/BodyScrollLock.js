// components/BodyScrollLock.tsx
'use client';

import { useEffect } from 'react';

export default function BodyScrollLock({ lock }) {
  useEffect(() => {
    if (lock) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }

    return () => {
      document.body.style.overflowY = 'auto';
    };
  }, [lock]);

  return null;
}

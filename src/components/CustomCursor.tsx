'use client';
import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    if (isMobile) return;

    const onMove = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`;
        cursorRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.body.classList.add('cursor-none');

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.body.classList.remove('cursor-none');
    };
  }, []);

  return <div ref={cursorRef} className="custom-cursor hidden md:block" />;
}
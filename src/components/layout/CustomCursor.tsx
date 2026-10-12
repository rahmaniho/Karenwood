'use client';

import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(true);

  const cursorX = useSpring(-100, { stiffness: 380, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 380, damping: 28 });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) {
      setIsTouch(true);
      return;
    }
    setIsTouch(false);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.tagName === 'A' ||
          target.tagName === 'BUTTON' ||
          target.closest('a') ||
          target.closest('button') ||
          target.getAttribute('role') === 'button')
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor, { passive: true });
    window.addEventListener('mouseover', handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY, visible]);

  if (isTouch) return null;

  return (
    <motion.div
      aria-hidden="true"
      style={{
        translateX: cursorX,
        translateY: cursorY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[100] hidden lg:block"
    >
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full border transition-all duration-200 ${
          hovered
            ? 'h-12 w-12 border-bronze bg-bronze/15 scale-110'
            : 'h-8 w-8 border-bronze/65 bg-transparent'
        }`}
      >
        <div
          className={`rounded-full transition-all duration-200 ${
            hovered ? 'h-2 w-2 bg-bronze' : 'h-1.5 w-1.5 bg-walnut dark:bg-cream'
          }`}
        />
      </div>
    </motion.div>
  );
}

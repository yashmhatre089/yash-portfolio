import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const CustomCursor = () => {
  const [isDesktop, setIsDesktop] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // High-performance motion values
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Luxury easing spring physics
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only mount cursor on non-touch devices
    if (window.matchMedia('(pointer: fine)').matches) {
      setIsDesktop(true);
    }

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e) => {
      if (e.target.closest('a') || e.target.closest('button') || e.target.closest('[data-cursor="project"]')) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isDesktop) return null;

  return (
    <>
      {/* Outer Luxury Blur Ring */}
      <motion.div
        style={{
          x: smoothX,
          y: smoothY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '40px',
          height: '40px',
          marginLeft: '-20px',
          marginTop: '-20px',
          borderRadius: '50%',
          border: '1px solid var(--border-gold)',
          backgroundColor: isHovering ? 'var(--accent-gold)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
        }}
        animate={{
          scale: isHovering ? 2.5 : 1,
          opacity: isHovering ? 0.8 : 0.4,
        }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        {isHovering && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontSize: '4px',
              fontFamily: 'var(--font-mono)',
              color: '#000',
              fontWeight: 600,
              letterSpacing: '0.5px',
              textAlign: 'center',
              lineHeight: 1,
            }}
          >
            VIEW<br/>PROJECT
          </motion.span>
        )}
      </motion.div>

      {/* Inner Core Dot */}
      <motion.div
        style={{
          x: cursorX,
          y: cursorY,
          position: 'fixed',
          top: 0,
          left: 0,
          width: '8px',
          height: '8px',
          marginLeft: '-4px',
          marginTop: '-4px',
          borderRadius: '50%',
          backgroundColor: 'var(--accent-gold)',
          pointerEvents: 'none',
          zIndex: 10000,
        }}
        animate={{
          scale: isHovering ? 0 : 1,
          opacity: isHovering ? 0 : 1,
        }}
      />
    </>
  );
};

export default CustomCursor;
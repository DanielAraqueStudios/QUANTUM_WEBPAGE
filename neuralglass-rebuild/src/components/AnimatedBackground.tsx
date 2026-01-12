'use client';

import { useEffect, useRef } from 'react';
import styles from './AnimatedBackground.module.css';

export function AnimatedBackground() {
  const shapesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!shapesRef.current) return;
      const shapes = shapesRef.current.querySelectorAll('.shape');
      const scrolled = window.pageYOffset;

      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.3;
        (shape as HTMLElement).style.transform = `translateY(${scrolled * speed}px) rotate(${scrolled * 0.1}deg)`;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Neural Background */}
      <div className={styles.neuralBackground} />

      {/* Floating Geometric Shapes */}
      <div ref={shapesRef} className={styles.geometricShapes}>
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
        <div className="shape" />
      </div>

      {/* Neural Network Lines */}
      <div className={styles.neuralLines}>
        <div className={styles.neuralLine} />
        <div className={styles.neuralLine} />
        <div className={styles.neuralLine} />
      </div>
    </>
  );
}

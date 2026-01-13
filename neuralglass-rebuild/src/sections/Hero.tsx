'use client';

import { Suspense, lazy, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/MagneticButton';
import styles from './Hero.module.css';

// Lazy load the 3D scene
const Hero3DScene = lazy(() =>
  import('@/components/Hero3DScene').then((mod) => ({ default: mod.Hero3DScene }))
);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.34, 1.56, 0.64, 1],
    },
  },
};

export function Hero() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <section className={styles.hero} id="home">
      {/* 3D Scene Background - Only render on client */}
      {isMounted && (
        <Suspense fallback={<div style={{ position: 'absolute', inset: 0 }} />}>
          <Hero3DScene />
        </Suspense>
      )}

      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.heroSubtitle} variants={itemVariants}>
          Construimos y Hacemos Crecer Tu Negocio
        </motion.div>

        <motion.h1 variants={itemVariants}>
          QUANTUM SOFTWARE & MARKETING
        </motion.h1>

        <motion.div className={styles.heroDescription} variants={itemVariants}>
          <p>
            Desarrollo de software a medida y marketing digital de alto rendimiento. 
            Tecnología que funciona: rápida, escalable y 100% tuya. Marketing que convierte: 
            crecimiento orgánico + campañas optimizadas para ROI. Transforma tu presencia digital 
            con soluciones diseñadas para resultados reales.
          </p>
        </motion.div>

        <motion.div className={styles.heroStats} variants={itemVariants}>
          {[
            { number: '12.7K', label: 'Seguidores Instagram' },
            { number: '49.3K', label: 'Seguidores TikTok' },
            { number: '6x', label: 'Crecimiento Ventas' },
            { number: '100%', label: 'Código Propio' },
          ].map((stat, index) => (
            <motion.div
              key={index}
              className={styles.heroStat}
              variants={statVariants}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 },
              }}
            >
              <span className={styles.heroStatNumber}>{stat.number}</span>
              <span className={styles.heroStatLabel}>{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div className={styles.ctaButtons} variants={itemVariants}>
          <MagneticButton variant="primary" href="#services">
            Ver Nuestros Servicios
          </MagneticButton>
          <MagneticButton variant="secondary" href="#contact">
            Solicitar Cotización
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className={styles.heroGlow} />
    </section>
  );
}

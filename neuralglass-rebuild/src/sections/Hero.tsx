'use client';

import { Suspense, lazy } from 'react';
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
  return (
    <section className={styles.hero} id="home">
      {/* 3D Scene Background */}
      <Suspense fallback={null}>
        <Hero3DScene />
      </Suspense>

      <motion.div
        className={styles.heroContent}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className={styles.heroSubtitle} variants={itemVariants}>
          Welcome to the Future
        </motion.div>

        <motion.h1 variants={itemVariants}>
          NEURAL INTERFACE
        </motion.h1>

        <motion.div className={styles.heroDescription} variants={itemVariants}>
          <p>
            Experience the convergence of consciousness and technology through quantum-enhanced
            glassmorphism interfaces. Step into a reality where digital dreams become tangible
            experiences, transcending the boundaries between mind and machine.
          </p>
        </motion.div>

        <motion.div className={styles.heroStats} variants={itemVariants}>
          {[
            { number: '99.9%', label: 'Neural Sync Rate' },
            { number: '∞', label: 'Processing Power' },
            { number: '0.001', label: 'Latency (ms)' },
            { number: '24/7', label: 'Neural Access' },
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
          <MagneticButton variant="primary" href="#features">
            Initialize Neural Link
          </MagneticButton>
          <MagneticButton variant="secondary" href="#showcase">
            Explore Matrix
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div className={styles.heroGlow} />
    </section>
  );
}

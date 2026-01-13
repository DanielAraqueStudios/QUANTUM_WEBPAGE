'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './WhyChooseUs.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const reasons = [
  {
    icon: '💎',
    title: 'Código Puro & Propiedad',
    description: 'Desarrollo con HTML, CSS y JavaScript puro. Sin dependencia de plataformas. Tú eres dueño del código al 100%. Libertad total para elegir hosting y dominio.'
  },
  {
    icon: '🔥',
    title: 'Mapas de Calor',
    description: 'Análisis visual de comportamiento de usuarios. Identifica dónde hacen clic, cómo se mueven y qué áreas ignoran. Optimización basada en datos reales.'
  },
  {
    icon: '🚀',
    title: 'SEO & Performance',
    description: 'Estructura optimizada para motores de búsqueda desde el código. Carga ultrarrápida, arquitectura escalable y mejores prácticas de posicionamiento.'
  },
  {
    icon: '🎨',
    title: 'UI/UX Profesional',
    description: 'Diseño centrado en el usuario. Interfaces intuitivas, atractivas y funcionales. Experiencia de navegación que convierte visitantes en clientes.'
  },
  {
    icon: '📈',
    title: 'Escalabilidad',
    description: 'Sistemas preparados para crecer contigo. Arquitectura modular que permite agregar funcionalidades sin reconstruir desde cero.'
  }
];

export function WhyChooseUs() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from('.why-title', {
        scrollTrigger: {
          trigger: '.why-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      });

      cardsRef.current.forEach((card, index) => {
        if (!card) return;

        // Animate cards in a staggered hexagon pattern
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          scale: 0.8,
          rotation: index % 2 === 0 ? 30 : -30,
          duration: 0.8,
          delay: index * 0.12,
          ease: 'back.out(1.2)',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.whyChooseUs} id="why-us">
      <div className={styles.container}>
        <motion.h2
          className="why-title"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginBottom: '80px',
            background: 'linear-gradient(135deg, #ff69b4 0%, #e0a3ff 50%, #00ffff 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          POR QUÉ ELEGIRNOS
        </motion.h2>

        <div className={styles.reasonsGrid}>
          {reasons.map((reason, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={styles.reasonCard}
            >
              <div className={styles.reasonIcon}>{reason.icon}</div>
              <h3 className={styles.reasonTitle}>{reason.title}</h3>
              <p className={styles.reasonDescription}>{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

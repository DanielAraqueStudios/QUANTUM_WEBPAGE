'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CaseStudies.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const socialProof = [
  {
    platform: 'Instagram',
    metric: '12.7K',
    label: 'Seguidores',
    color: '#E1306C',
    growth: '+280%'
  },
  {
    platform: 'TikTok',
    metric: '49.3K',
    label: 'Seguidores',
    color: '#00f2ea',
    growth: '+450%'
  },
  {
    platform: 'TikTok',
    metric: '227.3K',
    label: 'Likes Totales',
    color: '#ff0050',
    growth: '+380%'
  }
];

const caseStudies = [
  {
    title: 'E-commerce de Moda',
    challenge: 'Ventas estancadas en 10M COP/mes con bajo engagement en redes',
    solution: 'Estrategia integral: rediseño web + campañas Meta Ads + contenido orgánico optimizado',
    result: 'De 10M a 60M COP/mes',
    growth: '6x',
    metrics: [
      'ROI: 520%',
      'CPA reducido 65%',
      'Engagement +340%',
      'Tasa conversión: 4.8%'
    ]
  },
  {
    title: 'Servicios B2B',
    challenge: 'Sin presencia digital estructurada, captación manual de leads',
    solution: 'Desarrollo web custom + WhatsApp Bot + SEO estratégico',
    result: 'Automatización 80% atención',
    growth: '3.5x leads',
    metrics: [
      'Leads calificados +250%',
      'Tiempo respuesta: <2min',
      'Satisfacción: 94%',
      'Conversión: 12%'
    ]
  }
];

export function CaseStudies() {
  const sectionRef = useRef<HTMLElement>(null);
  const socialCardsRef = useRef<HTMLDivElement[]>([]);
  const caseCardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Title animation
      gsap.from('.case-title', {
        scrollTrigger: {
          trigger: '.case-title',
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      });

      // Social proof cards
      socialCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 60,
          scale: 0.9,
          duration: 0.7,
          delay: index * 0.15,
          ease: 'back.out(1.4)',
        });
      });

      // Case study cards
      caseCardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          x: index % 2 === 0 ? -80 : 80,
          duration: 0.9,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.caseStudies} id="results">
      <div className={styles.container}>
        <motion.h2
          className="case-title"
          style={{
            textAlign: 'center',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginBottom: '80px',
            background: 'linear-gradient(135deg, #00ffff 0%, #ff69b4 50%, #9370db 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800,
          }}
        >
          RESULTADOS COMPROBADOS
        </motion.h2>

        {/* Social Proof Section */}
        <div className={styles.socialProofSection}>
          <h3 className={styles.sectionSubtitle}>Nuestro Alcance en Redes</h3>
          <div className={styles.socialProofGrid}>
            {socialProof.map((item, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) socialCardsRef.current[index] = el;
                }}
                className={styles.socialCard}
                style={{ borderColor: `${item.color}40` }}
              >
                <div className={styles.socialPlatform}>{item.platform}</div>
                <div className={styles.socialMetric} style={{ color: item.color }}>
                  {item.metric}
                </div>
                <div className={styles.socialLabel}>{item.label}</div>
                <div className={styles.socialGrowth}>Crecimiento: {item.growth}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Case Studies Section */}
        <div className={styles.caseStudiesSection}>
          <h3 className={styles.sectionSubtitle}>Casos de Éxito</h3>
          <div className={styles.caseStudiesGrid}>
            {caseStudies.map((study, index) => (
              <div
                key={index}
                ref={(el) => {
                  if (el) caseCardsRef.current[index] = el;
                }}
                className={styles.caseCard}
              >
                <div className={styles.caseHeader}>
                  <h4 className={styles.caseTitle}>{study.title}</h4>
                  <div className={styles.caseGrowthBadge}>{study.growth}</div>
                </div>

                <div className={styles.caseSection}>
                  <div className={styles.caseSectionLabel}>Desafío</div>
                  <p className={styles.caseSectionText}>{study.challenge}</p>
                </div>

                <div className={styles.caseSection}>
                  <div className={styles.caseSectionLabel}>Solución</div>
                  <p className={styles.caseSectionText}>{study.solution}</p>
                </div>

                <div className={styles.caseResult}>
                  <div className={styles.resultHighlight}>{study.result}</div>
                </div>

                <div className={styles.caseMetrics}>
                  {study.metrics.map((metric, i) => (
                    <div key={i} className={styles.metricItem}>
                      {metric}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

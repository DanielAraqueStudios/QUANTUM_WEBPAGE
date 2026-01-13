'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './Services.module.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const services = [
  {
    icon: '🌐',
    title: 'Desarrollo Web a Medida',
    description: 'Sitios web 100% personalizados con código puro (HTML, CSS, JavaScript + Bootstrap). Diseño responsive, carga rápida y estructura escalable. Tú eres dueño del código.',
    features: ['Diseño ilimitado', 'SEO optimizado', 'Mapas de calor', 'UI/UX profesional', 'Hosting independiente']
  },
  {
    icon: '⚙️',
    title: 'Software Personalizado',
    description: 'Soluciones de software a medida para tu negocio. Sistemas de facturación, plataformas operativas y herramientas internas diseñadas específicamente para tus procesos.',
    features: ['100% customizado', 'Escalable', 'Integrable', 'Soporte continuo', 'Código propio']
  },
  {
    icon: '💬',
    title: 'Bot de WhatsApp',
    description: 'Automatización inteligente para atención al cliente, captura de leads, notificaciones y asistencia en ventas. Respuesta 24/7 sin intervención humana.',
    features: ['Soporte automático', 'Captura de leads', 'Flujos personalizados', 'Integración CRM', 'Analytics']
  },
  {
    icon: '📱',
    title: 'Marketing Digital & Redes Sociales',
    description: 'Gestión profesional de Instagram, TikTok y Facebook. Crecimiento orgánico e inorgánico, sin promesas irreales. Enfoque en engagement real y comunidad activa.',
    features: ['Community Manager', 'Contenido estratégico', 'Crecimiento real', 'Analytics', 'Calendario editorial']
  },
  {
    icon: '🎯',
    title: 'Facebook & Meta Ads',
    description: 'Campañas publicitarias optimizadas para ROI. Investigación de mercado, segmentación precisa de buyer persona, storytelling y optimización continua de presupuesto.',
    features: ['Optimización ROI', 'Segmentación precisa', 'A/B Testing', 'Reportes detallados', 'Remarketing']
  }
];

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Animate section title
      gsap.from('.services-title', {
        scrollTrigger: {
          trigger: '.services-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        y: 60,
        duration: 1,
        ease: 'power3.out',
      });

      // Animate service cards
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        
        gsap.from(card, {
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse',
          },
          opacity: 0,
          y: 80,
          rotateX: -15,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className={styles.services} id="services">
      <div className={styles.container}>
        <motion.h2 
          className="services-title"
          style={{ 
            textAlign: 'center',
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            marginBottom: '80px',
            background: 'linear-gradient(135deg, #e0a3ff 0%, #ff69b4 50%, #9370db 100%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 800
          }}
        >
          NUESTROS SERVICIOS
        </motion.h2>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <div
              key={index}
              ref={(el) => {
                if (el) cardsRef.current[index] = el;
              }}
              className={styles.serviceCard}
            >
              <div className={styles.serviceIcon}>{service.icon}</div>
              <h3 className={styles.serviceTitle}>{service.title}</h3>
              <p className={styles.serviceDescription}>{service.description}</p>
              <ul className={styles.serviceFeatures}>
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <span className={styles.featureCheck}>✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

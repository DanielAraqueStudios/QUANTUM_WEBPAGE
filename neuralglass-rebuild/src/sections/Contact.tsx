'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from '@/components/MagneticButton';
import styles from './Contact.module.css';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: ''
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Simulate form submission
    setTimeout(() => {
      setStatus('success');
      setTimeout(() => {
        setStatus('idle');
        setFormData({ name: '', email: '', service: '', message: '' });
      }, 3000);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section className={styles.contact} id="contact">
      <div className={styles.container}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <h2 className={styles.title}>TRANSFORMEMOS TU NEGOCIO</h2>
          <p className={styles.subtitle}>
            Cuéntanos sobre tu proyecto y recibe una cotización personalizada en 24 horas
          </p>
        </motion.div>

        <div className={styles.contactGrid}>
          {/* Contact Info */}
          <motion.div
            className={styles.contactInfo}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.infoCard}>
              <h3 className={styles.infoTitle}>¿Por qué Quantum?</h3>
              <ul className={styles.benefitsList}>
                <li>✓ Tecnología 100% tuya (sin dependencias)</li>
                <li>✓ Resultados medibles y comprobados</li>
                <li>✓ Estrategias personalizadas para tu mercado</li>
                <li>✓ Soporte y seguimiento continuo</li>
                <li>✓ ROI demostrable desde el día 1</li>
              </ul>
            </div>

            <div className={styles.statsBox}>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>+150</span>
                <span className={styles.statLabel}>Proyectos Exitosos</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>94%</span>
                <span className={styles.statLabel}>Satisfacción Cliente</span>
              </div>
              <div className={styles.statItem}>
                <span className={styles.statNumber}>24/7</span>
                <span className={styles.statLabel}>Soporte Disponible</span>
              </div>
            </div>

            <div className={styles.quantumBranding}>
              <div className={styles.brandingText}>We are</div>
              <div className={styles.brandingLogo}>QUANTUM</div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            className={styles.formContainer}
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name" className={styles.label}>Nombre Completo</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="Juan Pérez"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Correo Electrónico</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={styles.input}
                  placeholder="juan@empresa.com"
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="service" className={styles.label}>Servicio de Interés</label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  required
                  className={styles.select}
                >
                  <option value="">Selecciona un servicio</option>
                  <option value="web">Desarrollo Web</option>
                  <option value="software">Software Personalizado</option>
                  <option value="whatsapp">Bot de WhatsApp</option>
                  <option value="marketing">Marketing Digital</option>
                  <option value="ads">Facebook & Meta Ads</option>
                  <option value="full">Paquete Completo</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="message" className={styles.label}>Cuéntanos sobre tu proyecto</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={styles.textarea}
                  placeholder="Describe brevemente lo que necesitas y tus objetivos..."
                />
              </div>

              <MagneticButton
                type="submit"
                variant="primary"
                disabled={status === 'sending' || status === 'success'}
                style={{ width: '100%', cursor: status !== 'idle' ? 'not-allowed' : 'pointer' }}
              >
                {status === 'idle' && 'Solicitar Cotización Gratis'}
                {status === 'sending' && 'Enviando...'}
                {status === 'success' && '✓ ¡Mensaje Enviado!'}
                {status === 'error' && 'Error - Reintentar'}
              </MagneticButton>

              {status === 'success' && (
                <div className={styles.successMessage}>
                  ¡Gracias! Nos pondremos en contacto contigo en las próximas 24 horas.
                </div>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

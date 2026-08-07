"use client";

import { motion, useScroll, useSpring } from "motion/react";

/**
 * Scroll Progress — port del componente de Cnippet / Ali Imam (21st.dev).
 *
 * El patrón "Scroll-Triggered Storytelling" que devolvió la skill pide
 * indicador de progreso explícito: la página es larga y sin él el lector no
 * sabe cuánto falta. 2px de navy, sin color extra.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 40,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-navy"
    />
  );
}

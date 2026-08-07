"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

/**
 * Container Scroll Animation — port del componente de "ui layout" / Manu Arora
 * (21st.dev, uno de los destacados de la home).
 *
 * La maqueta del producto arranca inclinada en X y se endereza a medida que
 * subís. Da la sensación de que la pantalla se levanta hacia el lector.
 *
 * Cambios respecto al original:
 * - rotateX de 22° en vez de 45°: a 45° la UI de adentro es ilegible en el
 *   estado inicial, y una maqueta de ERP se sostiene por lo que se lee en ella.
 * - Se desactiva bajo 768px. El original mantiene el efecto en mobile y ahí el
 *   pinning pelea con el scroll táctil.
 */
export function ContainerScroll({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.9, 1]);
  const translateY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  if (reduced) {
    return (
      <div ref={ref} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: "1200px", perspectiveOrigin: "50% 0%" }}
    >
      <motion.div
        style={{
          rotateX,
          scale,
          y: translateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        className="max-md:!transform-none"
      >
        {children}
      </motion.div>
    </div>
  );
}

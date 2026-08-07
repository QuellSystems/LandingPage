"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, useReducedMotion } from "motion/react";

/**
 * Text Highlighter — port del componente de Daniel Petho (21st.dev).
 *
 * Dibuja un resaltado detrás de una frase cuando entra en viewport, con la
 * inclinación mínima de un subrayador real. Se usa una sola vez en toda la
 * página, sobre la frase que define el negocio: repetirlo lo vuelve ruido.
 */
export function TextHighlighter({
  children,
  className,
  delay = 0.15,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.9 });
  const reduced = useReducedMotion();

  return (
    <span ref={ref} className={`relative inline-block ${className ?? ""}`}>
      <motion.span
        aria-hidden="true"
        className="absolute inset-x-[-0.18em] bottom-[0.04em] top-[0.14em] -z-10 origin-left rounded-[3px] bg-slate-500/30"
        initial={{ scaleX: reduced ? 1 : 0 }}
        animate={inView || reduced ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      />
      <span className="relative">{children}</span>
    </span>
  );
}

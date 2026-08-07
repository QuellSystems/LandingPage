"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Reveal de entrada en viewport. Es la unidad base de movimiento de toda la
 * página: la skill devolvió "Scroll Reveal / Standard" con y: 24, duración
 * 400-600ms, ease power2.out y stagger 0.08 — esto es esa receta en motion.
 *
 * Una sola primitiva para todas las secciones. Un efecto distinto por sección
 * es exactamente lo que delata una página armada por partes.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  y = 24,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "section" | "li" | "span" | "p";
}) {
  const reduced = useReducedMotion();
  const MotionTag = motion[Tag];

  return (
    <MotionTag
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25, margin: "0px 0px -60px 0px" }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Stagger de hijos. `amount: 0.15` para que dispare cuando asoma la grilla,
 * no cuando ya se ve entera.
 */
export function RevealGroup({
  children,
  className,
  stagger = 0.07,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const reduced = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduced ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: stagger } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

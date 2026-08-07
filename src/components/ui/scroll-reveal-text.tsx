"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Scroll Reveal Text — port del patrón "Scroll and Swap Text" / "Text Reveal"
 * (Daniel Petho y Cnippet en 21st.dev).
 *
 * El párrafo entra en slate y se va tiñendo a navy palabra por palabra a medida
 * que la sección cruza el viewport. El scrub va atado al scrollbar, no a un
 * timer: si el usuario para, el texto para.
 *
 * Elegido para la sección de problema porque hace que un párrafo largo se lea
 * de verdad — obliga a un ritmo de lectura en vez de ser un bloque que se saltea.
 */
export function ScrollRevealText({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.55"],
  });

  const words = children.split(" ");

  if (reduced) {
    return <p className={cn("text-navy", className)}>{children}</p>;
  }

  return (
    <p ref={ref} className={cn("text-navy", className)}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = start + 1 / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  // Arranca en 0.18 y no en 0: el texto siempre está ahí, sólo cambia de peso
  // visual. Partir de 0 se lee como contenido que todavía no cargó.
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <>
      <motion.span className="inline-block" style={{ opacity }}>
        {children}
      </motion.span>{" "}
    </>
  );
}

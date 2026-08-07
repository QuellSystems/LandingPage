"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Text Rotate — port del componente de Daniel Petho (21st.dev).
 *
 * Rota una palabra del H1 con stagger por carácter. El original mide y anima el
 * ancho del contenedor; acá se reserva el ancho de la palabra más larga con una
 * copia invisible, que evita el reflow del titular en cada cambio (CLS).
 *
 * Bajo reduced-motion se congela en la primera palabra en vez de rotar sin
 * animación: el cambio de texto solo también es movimiento.
 */
export function TextRotate({
  words,
  className,
  interval = 2600,
}: {
  words: string[];
  className?: string;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % words.length),
      interval
    );
    return () => clearInterval(id);
  }, [words.length, interval, reduced]);

  const longest = words.reduce((a, b) => (a.length >= b.length ? a : b));
  const current = reduced ? words[0] : words[index];

  return (
    <span className={cn("relative inline-grid align-bottom", className)}>
      {/* Reserva de ancho: nunca se ve, sostiene el layout del titular */}
      <span className="invisible col-start-1 row-start-1" aria-hidden="true">
        {longest}
      </span>

      <span className="col-start-1 row-start-1 overflow-hidden" aria-hidden="true">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span key={current} className="inline-flex">
            {current.split("").map((char, i) => (
              <motion.span
                key={`${current}-${i}`}
                className="inline-block"
                initial={reduced ? false : { y: "100%", opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={reduced ? undefined : { y: "-100%", opacity: 0 }}
                transition={{
                  duration: 0.42,
                  delay: i * 0.025,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.span>
        </AnimatePresence>
      </span>

      {/* El texto real para lectores de pantalla: la rotación es decorativa */}
      <span className="sr-only">{words.join(", ")}</span>
    </span>
  );
}

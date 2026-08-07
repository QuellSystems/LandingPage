"use client";

import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";

type Props = {
  className?: string;
  /** Anima el módulo desprendiéndose de la esquina al montar. */
  animate?: boolean;
  title?: string;
};

/**
 * El símbolo de Quell — Dirección C, "El Módulo".
 * Contenedor cuadrado con contra circular + módulo que se desprende en la esquina.
 *
 * Portado del SVG de marca a JSX para poder animar el módulo por separado y
 * heredar el color con currentColor (el original tenía el navy hardcodeado).
 * La geometría es idéntica al archivo original: viewBox 120, contenedor 84×84
 * con rx 26, contra r=21 en (50,50), módulo 38×38 con rx 12 al 55% de opacidad.
 */
export function QuellMark({ className, animate = false, title }: Props) {
  const maskId = useId();
  const reduced = useReducedMotion();
  const shouldAnimate = animate && !reduced;

  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : "presentation"}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      <mask id={maskId}>
        <rect width="120" height="120" fill="#fff" />
        <circle cx="50" cy="50" r="21" fill="#000" />
        <rect x="66" y="66" width="52" height="52" rx="20" fill="#000" />
      </mask>

      <rect
        x="8"
        y="8"
        width="84"
        height="84"
        rx="26"
        fill="currentColor"
        mask={`url(#${maskId})`}
      />

      <motion.rect
        x="72"
        y="72"
        width="38"
        height="38"
        rx="12"
        fill="currentColor"
        opacity={0.55}
        initial={shouldAnimate ? { x: -14, y: -14, opacity: 0 } : false}
        animate={shouldAnimate ? { x: 0, y: 0, opacity: 0.55 } : undefined}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

/**
 * Lockup horizontal: símbolo + "quell <sufijo>".
 *
 * El mismo patrón sirve para la empresa (`systems`) y para cada producto
 * (`clinic`, `coach`, `supply`). Que compartan la construcción exacta es lo que
 * los hace leer como familia y no como tres marcas sueltas.
 */
export function QuellLockup({
  className,
  animate = false,
  suffix = "systems",
  markClassName = "h-7 w-7",
  size = 19,
}: {
  className?: string;
  animate?: boolean;
  suffix?: string;
  markClassName?: string;
  size?: number;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className ?? ""}`}>
      <QuellMark className={`shrink-0 ${markClassName}`} animate={animate} />
      <span className="flex items-baseline gap-1.5 leading-none">
        <span
          className="font-semibold tracking-tight"
          style={{ fontSize: `${size}px` }}
        >
          quell
        </span>
        <span
          className="font-mono tracking-wide opacity-60"
          style={{ fontSize: `${Math.round(size * 0.63)}px` }}
        >
          {suffix}
        </span>
      </span>
      {/* Sin sr-only: "quell" y el sufijo son texto real y se leen bien tal cual.
          Duplicarlos hacía que el lector dijera "quell supply Quell Supply". */}
    </span>
  );
}

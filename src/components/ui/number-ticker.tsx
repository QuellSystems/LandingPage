"use client";

import { useCallback, useEffect, useLayoutEffect, useRef } from "react";
import {
  useInView,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from "motion/react";
import { cn } from "@/lib/utils";

/** useLayoutEffect en cliente, no-op en SSR (evita el warning de React). */
const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/**
 * Number Ticker — port del componente de Daniel Petho / Dillion Verma (21st.dev).
 *
 * Cuenta hasta el valor cuando entra en viewport. Escribe directo en textContent
 * en vez de pasar por estado de React: son ~60 actualizaciones por segundo y
 * un setState por frame haría re-render de todo el árbol de la sección.
 *
 * El valor real va en el DOM desde el server (children del <span>), así que
 * lectores de pantalla y crawlers ven el número final, no "0".
 */
export function NumberTicker({
  value,
  decimals = 0,
  prefix = "",
  suffix = "",
  className,
}: {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -80px 0px" });
  const reduced = useReducedMotion();

  const motionValue = useMotionValue(0);
  const spring = useSpring(motionValue, {
    damping: 42,
    stiffness: 110,
    mass: 1,
  });

  const format = useCallback(
    (n: number) =>
      prefix +
      Intl.NumberFormat("es-AR", {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      }).format(n) +
      suffix,
    [prefix, suffix, decimals]
  );

  // El HTML del server trae el valor final. Antes del primer paint lo bajamos a
  // 0 para que la cuenta arranque desde ahí sin que se vea el número saltando.
  useIsomorphicLayoutEffect(() => {
    if (reduced || !ref.current) return;
    ref.current.textContent = format(0);
  }, [reduced, format]);

  useEffect(() => {
    if (inView && !reduced) motionValue.set(value);
  }, [inView, reduced, motionValue, value]);

  useEffect(() => {
    if (reduced) return;
    return spring.on("change", (latest) => {
      if (!ref.current) return;
      ref.current.textContent = format(Number(latest.toFixed(decimals)));
    });
  }, [spring, decimals, reduced, format]);

  const formatted = format(value);

  return (
    <span ref={ref} className={cn("tabular", className)}>
      {formatted}
    </span>
  );
}

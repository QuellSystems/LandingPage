"use client";

import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Scroll suave global. Es lo que hace que el pin del hero y los scrubs
 * se sientan continuos en vez de escalonados.
 *
 * Se desactiva entero bajo prefers-reduced-motion: con scroll sintético
 * activo, quien pidió menos movimiento igual lo recibe.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (query.matches) return;

    const lenis = new Lenis({
      duration: 1.05,
      // Curva exponencial: arranca rápido y frena largo, sin sensación de peso
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.6,
    });

    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return null;
}

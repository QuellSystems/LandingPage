"use client";

import { Children, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Marquee — port del componente de Dillion Verma (magicui, vía 21st.dev),
 * simplificado a CSS puro: sin JS en el loop, el compositor lo resuelve solo.
 *
 * Duplica el contenido una vez y traslada -50%: el corte cae exactamente en la
 * costura, así que el bucle no tiene salto. `pauseOnHover` respeta a quien quiere
 * leer un logo concreto.
 */
export function Marquee({
  children,
  className,
  speed = 42,
  reverse = false,
  pauseOnHover = true,
}: {
  children: ReactNode;
  className?: string;
  /** Segundos por vuelta completa. Más alto = más lento. */
  speed?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
}) {
  const items = Children.toArray(children);

  return (
    <div
      className={cn("group flex overflow-hidden", className)}
      // aria-hidden: es decoración en bucle, el listado accesible va aparte
      aria-hidden="true"
    >
      {[0, 1].map((copy) => (
        <div
          key={copy}
          className={cn(
            "flex shrink-0 items-center gap-14 pr-14 will-change-transform",
            "motion-safe:animate-[quell-marquee_linear_infinite]",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          style={{
            animationDuration: `${speed}s`,
            animationDirection: reverse ? "reverse" : "normal",
          }}
        >
          {items.map((item, i) => (
            <div key={i} className="shrink-0">
              {item}
            </div>
          ))}
        </div>
      ))}

      <style>{`
        @keyframes quell-marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
}

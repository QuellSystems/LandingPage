"use client";

import { cn } from "@/lib/utils";

/**
 * Progressive Blur — port del patrón de Dillion Verma / Julien Thibeaut (21st.dev).
 *
 * Apila N capas de backdrop-blur, cada una con una mask-image desplazada, de modo
 * que el desenfoque crece de forma continua en vez de cortar de golpe. Se usa en
 * los bordes del marquee: el logo no "desaparece", se disuelve.
 *
 * Por qué no un simple gradiente a color de fondo: sobre una sección con textura
 * o borde, el gradiente sólido se nota como una banda. El blur progresivo no.
 */
export function ProgressiveBlur({
  className,
  direction = "left",
  blurLayers = 6,
  blurIntensity = 0.4,
}: {
  className?: string;
  direction?: "left" | "right";
  blurLayers?: number;
  blurIntensity?: number;
}) {
  const layers = Math.max(blurLayers, 2);
  const step = 100 / layers;

  return (
    <div className={cn("pointer-events-none relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const start = index * step;
        const end = (index + 1) * step;

        // Cada capa es visible sólo en su tramo, con un fundido a ambos lados
        // para que el salto entre capas no sea perceptible.
        const stops = [
          `rgba(0,0,0,0) ${start}%`,
          `rgba(0,0,0,1) ${start + step * 0.5}%`,
          `rgba(0,0,0,1) ${end}%`,
          `rgba(0,0,0,0) ${Math.min(end + step * 0.5, 100)}%`,
        ];
        const angle = direction === "left" ? "to right" : "to left";
        const gradient = `linear-gradient(${angle}, ${stops.join(", ")})`;

        return (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${(index + 1) * blurIntensity}px)`,
              WebkitBackdropFilter: `blur(${(index + 1) * blurIntensity}px)`,
            }}
          />
        );
      })}
    </div>
  );
}

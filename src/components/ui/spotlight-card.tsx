"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useMotionTemplate } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Spotlight Card — port del componente de Berkcan Gümüşışık (21st.dev), uno de
 * los destacados de la home.
 *
 * El original pinta un halo de color saturado sobre fondo oscuro. Acá el foco
 * ilumina sólo el **borde**, en navy al 22%, sobre card blanca: se lee como que
 * el papel toma un pliegue bajo el cursor, no como un glow de landing de IA.
 *
 * El seguimiento del mouse va por MotionValue, sin estado de React: mover el
 * cursor sobre una grilla de 6 cards no debe disparar 6 re-renders por frame.
 */
export function SpotlightCard({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(-500);
  const mouseY = useMotionValue(-500);

  const background = useMotionTemplate`radial-gradient(240px circle at ${mouseX}px ${mouseY}px, rgba(18,38,63,0.22), transparent 72%)`;

  return (
    <div
      ref={ref}
      onPointerMove={(event) => {
        // Sólo mouse: en touch el "hover" queda pegado tras el tap
        if (event.pointerType !== "mouse") return;
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
      }}
      onPointerLeave={() => {
        mouseX.set(-500);
        mouseY.set(-500);
      }}
      className={cn(
        "group relative rounded-[18px] bg-surface",
        "border border-border transition-colors duration-200",
        className
      )}
    >
      {/* Capa de borde iluminado: un rect con máscara que sólo deja ver 1px */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-px rounded-[19px] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background,
          maskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMaskImage:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative">{children}</div>
    </div>
  );
}

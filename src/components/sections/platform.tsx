"use client";

import { useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Boxes, HeartPulse, Dumbbell, Search } from "lucide-react";
import { ContainerScroll } from "@/components/ui/container-scroll";
import { Reveal } from "@/components/ui/reveal";
import {
  ErpMockup,
  ClinicaMockup,
  EntrenadorMockup,
} from "./platform-mockups";

const TABS = [
  {
    id: "supply",
    icon: Boxes,
    suffix: "supply",
    meta: "Compras · Stock · Despachos",
    host: "supply.quellsystems.com",
    Mockup: ErpMockup,
  },
  {
    id: "clinic",
    icon: HeartPulse,
    suffix: "clinic",
    meta: "Historia clínica · Turnos · Insumos",
    host: "clinic.quellsystems.com",
    Mockup: ClinicaMockup,
  },
  {
    id: "coach",
    icon: Dumbbell,
    suffix: "coach",
    meta: "Planificación · Seguimiento · Cuotas",
    host: "coach.quellsystems.com",
    Mockup: EntrenadorMockup,
  },
];

export function Platform() {
  const [active, setActive] = useState(0);
  const reduced = useReducedMotion();
  const indicatorId = useId();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const current = TABS[active];

  // Flechas para moverse entre tabs, como espera un tablist real
  const handleKeyDown = (event: React.KeyboardEvent) => {
    const delta =
      event.key === "ArrowRight" ? 1 : event.key === "ArrowLeft" ? -1 : 0;
    if (!delta) return;
    event.preventDefault();
    const next = (active + delta + TABS.length) % TABS.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="plataforma" className="relative overflow-hidden py-24 sm:py-32">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal className="mx-auto max-w-[62ch] text-center">
          <p className="kicker mb-7">03 / Plataforma</p>
          <h2 className="text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em] text-navy">
            Una sola pantalla donde antes había once pestañas
          </h2>
          <p className="mx-auto mt-6 max-w-[54ch] text-[16.5px] leading-[1.7] text-muted-foreground">
            La misma base, tres rubros distintos. Los estados, los nombres de los
            campos y las excepciones son los que cada equipo ya usa cuando habla
            entre sí. Cambiá de producto acá abajo.
          </p>
        </Reveal>

        {/* Selector de dominio */}
        <Reveal delay={0.08}>
          <div
            role="tablist"
            aria-label="Productos por suscripción"
            onKeyDown={handleKeyDown}
            className="mx-auto mt-11 flex w-fit max-w-full flex-wrap justify-center gap-1 rounded-[16px] border border-border bg-surface p-1.5"
          >
            {TABS.map((tab, index) => {
              const selected = index === active;
              return (
                <button
                  key={tab.id}
                  ref={(el) => {
                    tabRefs.current[index] = el;
                  }}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={selected}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  className="relative min-h-11 cursor-pointer rounded-[11px] px-4 text-[14px] font-medium transition-colors duration-200"
                >
                  {selected && (
                    <motion.span
                      layoutId={indicatorId}
                      className="absolute inset-0 rounded-[11px] bg-navy"
                      transition={
                        reduced
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                    />
                  )}
                  <span
                    className={`relative flex items-center gap-2 ${
                      selected ? "text-paper" : "text-muted-foreground"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" strokeWidth={1.6} />
                    <span className="flex items-baseline gap-1.5 leading-none">
                      <span className="font-semibold tracking-tight">quell</span>
                      <span className="font-mono text-[12px] tracking-wide opacity-70">
                        {tab.suffix}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        <ContainerScroll className="mt-10">
          <div className="overflow-hidden rounded-[20px] border border-navy-700 bg-navy-900 shadow-[0_24px_70px_-30px_rgba(18,38,63,0.55)]">
            {/* Barra de ventana */}
            <div className="flex items-center gap-3 border-b border-white/8 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
              </div>
              <div className="mx-auto flex min-w-0 items-center gap-2 rounded-[8px] bg-white/[0.06] px-3 py-1">
                <Search className="h-3 w-3 shrink-0 text-slate-300" strokeWidth={1.6} />
                <span className="truncate font-mono text-[11px] text-slate-300">
                  {current.host}
                </span>
              </div>
            </div>

            <div
              role="tabpanel"
              id={`panel-${current.id}`}
              aria-labelledby={`tab-${current.id}`}
            >
              {/* El cambio de `key` remonta la maqueta. Sin AnimatePresence a
                  propósito: con mode="wait" el hijo saliente queda cacheado y
                  el panel se quedaba mostrando el dominio anterior. */}
              <motion.div
                key={current.id}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
              >
                <current.Mockup />
              </motion.div>
            </div>
          </div>
        </ContainerScroll>

        <p className="mt-6 text-center font-mono text-[11px] uppercase tracking-[0.14em] text-slate-700">
          {current.meta}
        </p>
      </div>
    </section>
  );
}

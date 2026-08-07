"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useReducedMotion } from "motion/react";
import { Reveal } from "@/components/ui/reveal";

const STEPS = [
  {
    n: "01",
    week: "Semana 0",
    title: "Nos sentamos donde se trabaja",
    body: "Dos días en tu planta o depósito mirando cómo se carga un pedido de verdad, con las interrupciones y los atajos incluidos. No hay formulario de relevamiento que capture eso.",
  },
  {
    n: "02",
    week: "Semana 1–2",
    title: "Mapa de procesos y alcance cerrado",
    body: "Te entregamos el diagrama de cómo funciona hoy y la propuesta de qué módulo va primero, con precio y fecha. Si acá decidís no seguir, el mapa queda tuyo igual.",
  },
  {
    n: "03",
    week: "Semana 3–9",
    title: "Construcción con demo quincenal",
    body: "Cada dos semanas ves el sistema corriendo con tus datos. No hay entregas sorpresa al final: los desvíos se corrigen cuando todavía son baratos.",
  },
  {
    n: "04",
    week: "Semana 9–11",
    title: "Convivencia con el sistema viejo",
    body: "Dos o tres semanas cargando en paralelo hasta que los números cierran contra el proceso anterior. Recién ahí se apaga lo viejo.",
  },
  {
    n: "05",
    week: "Continuo",
    title: "Mantenimiento y módulo siguiente",
    body: "Abono mensual con horas de evolución incluidas. El sistema sigue cambiando porque tu operación sigue cambiando.",
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.7", "end 0.75"],
  });
  // Spring sobre el scrub: la línea sigue al scroll pero no vibra con el trackpad
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <section id="proceso" className="py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            05 / Proceso
          </p>
          <h2 className="max-w-[24ch] text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em] text-navy">
            Once semanas desde la primera reunión hasta apagar el sistema viejo
          </h2>
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-0">
          {/* Riel base + línea que se dibuja con el scroll */}
          <div
            aria-hidden="true"
            className="absolute bottom-0 left-[3px] top-2 w-px bg-border sm:left-[calc(11rem+3px)]"
          />
          <motion.div
            aria-hidden="true"
            style={{ scaleY: reduced ? 1 : scaleY }}
            className="absolute bottom-0 left-[3px] top-2 w-px origin-top bg-accent sm:left-[calc(11rem+3px)]"
          />

          <ol>
            {STEPS.map((step, i) => (
              <li key={step.n} className="relative">
                <Reveal delay={i * 0.05}>
                  <div className="flex flex-col pb-14 sm:flex-row sm:gap-0">
                    <div className="shrink-0 sm:w-44 sm:pr-10 sm:text-right">
                      <span className="kicker">{step.week}</span>
                    </div>

                    {/* Nodo sobre el riel */}
                    <span
                      aria-hidden="true"
                      className="absolute left-[-1.75rem] top-1 h-[7px] w-[7px] rounded-full bg-accent ring-4 ring-background sm:left-[11rem]"
                    />

                    <div className="mt-3 sm:mt-0 sm:pl-10">
                      <div className="flex items-baseline gap-3.5">
                        <span className="font-mono text-[12px] text-slate-700">
                          {step.n}
                        </span>
                        <h3 className="text-[19px] font-medium tracking-tight text-navy">
                          {step.title}
                        </h3>
                      </div>
                      <p className="mt-3 max-w-[60ch] text-[15.5px] leading-[1.68] text-muted-foreground">
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

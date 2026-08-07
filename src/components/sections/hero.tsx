"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { ArrowRight, ArrowDown } from "lucide-react";
import { TextRotate } from "@/components/ui/text-rotate";
import { QuellMark } from "@/components/brand/quell-mark";

const FACTS = [
  { label: "Fundada", value: "2025" },
  { label: "Sistemas en producción", value: "3" },
  { label: "Rubros", value: "Industria · Salud · Fitness · Retail" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  // Parallax sólo sobre las capas decorativas del fondo, nunca sobre el texto.
  const gridY = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const markY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const fadeOut = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section
      ref={ref}
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-[68px]"
    >
      {/* --- Fondo: grilla de plano técnico. Sin aurora, sin blobs. --- */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : gridY }}
        className="absolute inset-0 -z-20"
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(124,143,168,0.16) 1px, transparent 1px), linear-gradient(to bottom, rgba(124,143,168,0.16) 1px, transparent 1px)",
            backgroundSize: "64px 64px",
            maskImage:
              "radial-gradient(120% 90% at 50% 20%, #000 30%, transparent 78%)",
            WebkitMaskImage:
              "radial-gradient(120% 90% at 50% 20%, #000 30%, transparent 78%)",
          }}
        />
      </motion.div>

      {/* El símbolo de marca como marca de agua a escala arquitectónica */}
      <motion.div
        aria-hidden="true"
        style={{ y: reduced ? 0 : markY }}
        className="pointer-events-none absolute -right-24 -top-16 -z-10 hidden text-slate-500/[0.07] lg:block"
      >
        <QuellMark className="h-[620px] w-[620px]" />
      </motion.div>

      <div className="mx-auto w-full max-w-[1200px] px-5 py-20 sm:px-8">
        <motion.p
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="kicker mb-7 flex items-center gap-3"
        >
          <span className="h-px w-8 shrink-0 bg-accent/60" />
          Software a medida · Productos por suscripción · Web
        </motion.p>

        <h1 className="max-w-[15ch] text-[clamp(2.6rem,7.2vw,5.1rem)] font-medium leading-[0.98] tracking-[-0.035em] text-navy">
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Tu sistema ya existe.
          </motion.span>
          <motion.span
            initial={reduced ? false : { opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="block text-slate-700"
          >
            Está repartido en{" "}
            <TextRotate
              className="text-navy"
              words={[
                "planillas",
                "WhatsApp",
                "fichas de papel",
                "seis cabezas",
                "un Access de 2011",
              ]}
            />
          </motion.span>
        </h1>

        <motion.p
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-[54ch] text-[17px] leading-[1.65] text-muted-foreground sm:text-[18px]"
        >
          Construimos software de gestión a medida, productos por suscripción
          para consultorios y entrenadores, y los sitios con los que se presentan.
          Mapeamos cómo trabaja tu equipo hoy —con sus atajos y sus excepciones—
          y armamos el sistema que ya estaban improvisando. Después lo mantenemos.
        </motion.p>

        <motion.div
          initial={reduced ? false : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <a
            href="#contacto"
            className="group inline-flex cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent px-6 py-3.5 text-[15px] font-medium text-paper transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent-dark"
          >
            Agendar diagnóstico de 30 min
            <ArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              strokeWidth={1.8}
            />
          </a>
          <a
            href="#proceso"
            className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-[14px] border border-border px-6 py-3.5 text-[15px] font-medium text-navy transition-colors duration-200 hover:border-slate-500 hover:bg-slate-100"
          >
            Cómo trabajamos
          </a>
        </motion.div>

        {/* Ficha técnica en mono — el mismo recurso que la hoja de identidad */}
        <motion.dl
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-16 grid max-w-[640px] grid-cols-1 gap-x-8 gap-y-6 border-t border-border pt-7 sm:grid-cols-3"
        >
          {FACTS.map((fact) => (
            <div key={fact.label}>
              <dt className="kicker mb-2">{fact.label}</dt>
              <dd className="font-mono text-[14px] text-navy">{fact.value}</dd>
            </div>
          ))}
        </motion.dl>
      </div>

      <motion.div
        aria-hidden="true"
        style={{ opacity: reduced ? 1 : fadeOut }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 lg:block"
      >
        <ArrowDown
          className="h-4 w-4 animate-bounce text-slate-500 motion-reduce:animate-none"
          strokeWidth={1.5}
        />
      </motion.div>
    </section>
  );
}

"use client";

import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { QuellMark } from "@/components/brand/quell-mark";

const STATS = [
  { value: 3, suffix: "", label: "Sistemas en producción", note: "desde 2025" },
  { value: 340, suffix: "", label: "Suscripciones activas", note: "supply · clinic · coach" },
  { value: 96, suffix: "%", label: "Renovación de abono", note: "desde el inicio" },
  { value: 4, suffix: " h", label: "Respuesta a incidente crítico", note: "SLA contractual" },
];

/**
 * PLACEHOLDER — reemplazar por testimonios reales con autorización del cliente.
 * Dejar nombre, cargo y empresa completos: un testimonio anónimo no prueba nada
 * y se lee como relleno.
 */
const QUOTES = [
  {
    quote:
      "Veníamos de dos implementaciones fallidas de ERP enlatado. Lo que cambió acá es que la primera versión que vimos ya cargaba nuestras órdenes reales, no un caso de ejemplo.",
    name: "Marnia Farfan",
    role: "Gerente de Operaciones",
    company: "",
  },
  {
    quote:
      "Pasamos de fichas de papel a Quell Clinic sin frenar la atención un solo día. El control de insumos se descuenta solo con cada práctica.",
    name: "Dr. Fernando Farfan",
    role: "Médico clínico",
    company: "",
  },
  {
    quote:
      "Armaba las rutinas de 90 alumnos a mano. Con Coach planifico el mesociclo una vez y cada uno lo ve en el celular con sus cargas cargadas.",
    name: "Pedro Blanco",
    role: "Entrenador fundador",
    company: "White Fitness",
  },
];

export function Proof() {
  return (
    <section id="casos" className="relative overflow-hidden bg-navy py-28 sm:py-36">
      {/* Marca de agua: mismo recurso que el hero, del otro lado */}
      <QuellMark
        className="pointer-events-none absolute -bottom-24 -left-24 h-[480px] w-[480px] text-white/[0.035]"
      />

      <div className="relative mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-8 flex items-center gap-3 text-slate-300">
            <span className="h-px w-8 shrink-0 bg-white/25" />
            06 / Resultados
          </p>
        </Reveal>

        <RevealGroup className="grid grid-cols-2 gap-x-8 gap-y-12 border-b border-white/12 pb-16 sm:grid-cols-4">
          {STATS.map((stat) => (
            <RevealItem key={stat.label}>
              <p className="tabular text-[clamp(2.4rem,5vw,3.6rem)] font-medium leading-none tracking-[-0.04em] text-paper">
                <NumberTicker value={stat.value} suffix={stat.suffix} />
              </p>
              <p className="mt-4 text-[15px] leading-snug text-slate-100">
                {stat.label}
              </p>
              <p className="mt-1.5 font-mono text-[11px] uppercase tracking-wider text-slate-500">
                {stat.note}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>

        <RevealGroup className="mt-16 grid gap-10 md:grid-cols-2 md:gap-12 lg:grid-cols-3">
          {QUOTES.map((item) => (
            <RevealItem key={item.name}>
              <figure>
                <blockquote className="text-[18px] leading-[1.55] tracking-[-0.01em] text-paper sm:text-[19px]">
                  <span className="text-slate-500">“</span>
                  {item.quote}
                  <span className="text-slate-500">”</span>
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-3.5 border-t border-white/12 pt-5">
                  {item.company && (
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[11px] border border-white/15 font-mono text-[11px] text-slate-100">
                      {item.company.slice(0, 2).toUpperCase()}
                    </span>
                  )}
                  <span className="text-[13.5px] leading-tight">
                    <span className="block text-paper">{item.name}</span>
                    <span className="block text-slate-500">
                      {item.role}{item.company ? ` · ${item.company}` : ""}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

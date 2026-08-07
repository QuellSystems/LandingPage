"use client";

import { Marquee } from "@/components/ui/marquee";
import { ProgressiveBlur } from "@/components/ui/progressive-blur";

/**
 * PLACEHOLDER — reemplazar por los clientes reales de Quell antes de publicar.
 * Se renderizan como wordmarks tipográficos a propósito: un logo real tiene
 * forma propia, y un SVG genérico gris inventado se nota a la legua.
 */
const CLIENTS = [
  { name: "Aldabra", meta: "Metalúrgica" },
  { name: "Centro Aranda", meta: "Salud" },
  { name: "Río Sur", meta: "Logística" },
  { name: "Estudio Nueve", meta: "Fitness" },
  { name: "NORTEC", meta: "Autopartes" },
  { name: "Casa Bergalli", meta: "Retail" },
  { name: "Delta Frío", meta: "Cadena de frío" },
  { name: "Kinesia", meta: "Kinesiología" },
  { name: "Ferrenta", meta: "Distribución" },
];

export function Clients() {
  return (
    <section className="border-y border-border bg-surface py-14">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <p className="kicker mb-9 text-center">
          Operando hoy en planta, depósito, consultorio y estudio
        </p>
      </div>

      <div className="relative">
        <Marquee speed={46}>
          {CLIENTS.map((client) => (
            <div key={client.name} className="flex items-baseline gap-2.5">
              <span className="text-[19px] font-medium tracking-tight text-navy/70">
                {client.name}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-wider text-slate-700">
                {client.meta}
              </span>
            </div>
          ))}
        </Marquee>

        {/* Bordes disueltos con blur progresivo en vez de un gradiente sólido */}
        <ProgressiveBlur
          direction="left"
          className="absolute inset-y-0 left-0 w-28"
        />
        <ProgressiveBlur
          direction="right"
          className="absolute inset-y-0 right-0 w-28"
        />
      </div>

      {/* Listado accesible: el marquee es aria-hidden */}
      <ul className="sr-only">
        {CLIENTS.map((client) => (
          <li key={client.name}>
            {client.name} — {client.meta}
          </li>
        ))}
      </ul>
    </section>
  );
}

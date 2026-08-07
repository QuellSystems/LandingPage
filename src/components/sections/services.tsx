"use client";

import {
  Boxes,
  HeartPulse,
  Dumbbell,
  Globe,
  ArrowUpRight,
  RefreshCw,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { QuellLockup } from "@/components/brand/quell-mark";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Cuatro líneas de servicio con pesos distintos en el grid. El bento parejo de
 * 2×2 haría parecer que las cuatro son lo mismo; no lo son. El software a
 * medida es el proyecto grande, los productos por suscripción son el ingreso
 * recurrente y la web es la puerta de entrada.
 */

const SUBSCRIPTION_PRODUCTS = [
  {
    icon: Boxes,
    suffix: "supply",
    tag: "Abastecimiento",
    para: "Para pymes con depósito",
    body: "Compras, stock y despachos en un solo lugar. Órdenes con avance de recepción, punto de reposición automático y trazabilidad por lote.",
    bullets: [
      "Órdenes de compra y recepción parcial",
      "Stock multidepósito con punto de reposición",
      "Remitos, despachos y trazabilidad",
      "Facturación AFIP",
    ],
  },
  {
    icon: HeartPulse,
    suffix: "clinic",
    tag: "Salud",
    para: "Para consultorios y centros",
    body: "Historia clínica digital, agenda de turnos y ficha de paciente con adjuntos. Multi-profesional, con permisos por rol y auditoría de acceso.",
    bullets: [
      "Historia clínica y evoluciones",
      "Turnos con recordatorio automático",
      "Stock de insumos con descargo por práctica",
      "Obras sociales y facturación",
    ],
  },
  {
    icon: Dumbbell,
    suffix: "coach",
    tag: "Fitness",
    para: "Para entrenadores y estudios",
    body: "Planificación semanal por alumno, biblioteca de ejercicios con video y seguimiento de adherencia. El alumno lo ve desde el celular.",
    bullets: [
      "Rutinas por alumno y por bloque",
      "Progresión y registro de cargas",
      "App para el alumno",
      "Cobro de la cuota mensual",
    ],
  },
];

export function Services() {
  return (
    <section
      id="servicios"
      className="border-t border-border bg-surface py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            02 / Servicios
          </p>
          <h2 className="max-w-[22ch] text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em] text-navy">
            Cuatro formas de trabajar con nosotros
          </h2>
          <p className="mt-6 max-w-[56ch] text-[16.5px] leading-[1.7] text-muted-foreground">
            Algunas empresas necesitan un sistema propio de cero. Otras se
            suscriben a uno que ya funciona en su rubro y lo ajustamos. Y otras
            arrancan por la web. Las tres puertas dan al mismo equipo.
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* --- Línea 1: software a medida (celda ancha) --- */}
          <RevealItem className="md:col-span-4">
            <SpotlightCard className="flex h-full flex-col p-7 sm:p-9">
              <div className="flex items-start justify-between gap-4">
                <Boxes className="h-6 w-6 text-navy" strokeWidth={1.4} />
                <span className="rounded-[8px] border border-border bg-slate-100 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-slate-700">
                  Proyecto
                </span>
              </div>
              <h3 className="mt-6 text-[21px] font-medium tracking-tight text-navy">
                Software de gestión a medida
              </h3>
              <p className="mt-3 max-w-[48ch] text-[15.5px] leading-[1.65] text-muted-foreground">
                Cuando ninguno de los tres productos encaja, construimos el
                sistema entero sobre tus procesos. Arrancamos por el módulo que
                más duele —casi siempre stock o facturación— y lo ponemos en
                producción antes de tocar el siguiente. Nunca hay un big bang de
                dieciocho meses.
              </p>
              <ul className="mt-7 flex flex-wrap gap-2">
                {[
                  "Compras",
                  "Stock y depósito",
                  "Producción",
                  "Facturación AFIP",
                  "Logística",
                  "Costos",
                  "Portal de clientes",
                ].map((tag) => (
                  <li
                    key={tag}
                    className="rounded-[8px] border border-border bg-slate-100 px-2.5 py-1 font-mono text-[11px] text-slate-700"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              <a
                href="#plataforma"
                className="group mt-8 inline-flex min-h-11 cursor-pointer items-center gap-1.5 self-start text-[14.5px] font-medium text-navy"
              >
                Ver las maquetas
                <ArrowUpRight
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </a>
            </SpotlightCard>
          </RevealItem>

          {/* --- Línea 3: web (celda alta) --- */}
          <RevealItem className="md:col-span-2">
            <SpotlightCard className="flex h-full flex-col p-7">
              <div className="flex items-start justify-between gap-4">
                <Globe className="h-6 w-6 text-navy" strokeWidth={1.4} />
                <span className="rounded-[8px] border border-border bg-slate-100 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-slate-700">
                  Desde 2 sem
                </span>
              </div>
              <h3 className="mt-6 text-[19px] font-medium tracking-tight text-navy">
                Landing pages y sitios
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                La página con la que se presenta el producto o la empresa.
                Diseño propio, no plantilla: identidad, copy, animación y
                medición de conversión.
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-border pt-5">
                {[
                  "Diseño e identidad",
                  "Next.js, carga en menos de 1 s",
                  "SEO técnico y analítica",
                  "Autogestión de contenido",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex gap-2.5 text-[14px] leading-snug text-muted-foreground"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-slate-500"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </RevealItem>

          {/* --- Línea 2: productos por suscripción (banda completa) --- */}
          <RevealItem className="md:col-span-6">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <RefreshCw className="h-6 w-6 text-navy" strokeWidth={1.4} />
                  <h3 className="mt-6 text-[21px] font-medium tracking-tight text-navy">
                    Sistemas por suscripción
                  </h3>
                  <p className="mt-3 max-w-[62ch] text-[15.5px] leading-[1.65] text-muted-foreground">
                    Tres productos ya construidos y andando, cada uno para un
                    rubro concreto. Comparten la misma base —usuarios, permisos,
                    reportes, facturación— y cambia lo de arriba. Se contratan
                    por abono mensual, se configuran en días y se ajustan a tu
                    forma de trabajar sin pagar un desarrollo desde cero.
                  </p>
                </div>
                <span className="rounded-[8px] border border-border bg-slate-100 px-2.5 py-1 font-mono text-[10.5px] uppercase tracking-wider text-slate-700">
                  Abono mensual
                </span>
              </div>

              <div className="mt-9 grid gap-px overflow-hidden rounded-[14px] border border-border bg-border lg:grid-cols-3">
                {SUBSCRIPTION_PRODUCTS.map((product) => (
                  <div key={product.suffix} className="bg-surface p-6 sm:p-7">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-navy text-paper">
                        <product.icon className="h-4 w-4" strokeWidth={1.7} />
                      </span>
                      <span className="kicker">{product.tag}</span>
                    </div>

                    {/* Mismo lockup que la marca madre: familia, no marcas sueltas */}
                    <h4 className="mt-5 text-navy">
                      <QuellLockup
                        suffix={product.suffix}
                        markClassName="h-[18px] w-[18px]"
                        size={17}
                      />
                    </h4>
                    <p className="mt-1.5 font-mono text-[11.5px] uppercase tracking-wider text-slate-700">
                      {product.para}
                    </p>

                    <p className="mt-3.5 text-[14.5px] leading-[1.65] text-muted-foreground">
                      {product.body}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {product.bullets.map((bullet) => (
                        <li
                          key={bullet}
                          className="flex gap-2.5 font-mono text-[12.5px] leading-snug text-slate-700"
                        >
                          <span aria-hidden="true" className="text-slate-500">
                            ·
                          </span>
                          {bullet}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <p className="mt-6 text-[14px] leading-relaxed text-muted-foreground">
                ¿Tu rubro no está en la lista? Los tres empezaron siendo un
                desarrollo a medida para un cliente. Si el problema se repite en
                varias empresas parecidas, lo convertimos en producto y el
                cuarto puede ser el tuyo.
              </p>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

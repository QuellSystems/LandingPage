"use client";

import {
  GitBranch,
  ShieldCheck,
  Gauge,
  PlugZap,
  FileSpreadsheet,
} from "lucide-react";
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

/**
 * Lo que va incluido en cualquiera de las cuatro líneas de servicio. No repite
 * el catálogo (eso está en `services.tsx`): son los diferenciales que aplican
 * igual si contratás un ERP, una suscripción o una landing.
 */
export function Capabilities() {
  return (
    <section
      id="capacidades"
      className="border-t border-border bg-surface py-28 sm:py-36"
    >
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-slate-300" />
            04 / Cómo trabajamos
          </p>
          <h2 className="max-w-[24ch] text-[clamp(1.9rem,4.2vw,2.9rem)] font-medium leading-[1.12] tracking-[-0.03em] text-navy">
            Lo que va incluido, contrates lo que contrates
          </h2>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-4 md:grid-cols-6">
          {/* Celda alta: el número que importa */}
          <RevealItem className="md:col-span-2">
            <SpotlightCard className="flex h-full flex-col justify-between p-7">
              <Gauge className="h-6 w-6 text-navy" strokeWidth={1.4} />
              <div className="mt-8">
                <p className="tabular text-[clamp(2.6rem,5vw,3.4rem)] font-medium leading-none tracking-[-0.04em] text-navy">
                  <NumberTicker value={9} />
                  <span className="text-slate-500"> sem</span>
                </p>
                <p className="mt-4 text-[15px] leading-[1.6] text-muted-foreground">
                  Mediana desde el kickoff hasta la primera versión usándose en
                  producción, no en demo. Una landing, dos.
                </p>
              </div>
            </SpotlightCard>
          </RevealItem>

          <RevealItem className="md:col-span-2">
            <SpotlightCard className="h-full p-7">
              <FileSpreadsheet className="h-6 w-6 text-navy" strokeWidth={1.4} />
              <h3 className="mt-6 text-[18px] font-medium tracking-tight text-navy">
                Migración de lo que ya tenés
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                Planillas, fichas de papel, el sistema viejo. Importamos el
                histórico con sus inconsistencias y te devolvemos el listado de
                lo que no cerraba: suele ser la primera auditoría real del dato.
              </p>
            </SpotlightCard>
          </RevealItem>

          <RevealItem className="md:col-span-2">
            <SpotlightCard className="h-full p-7">
              <PlugZap className="h-6 w-6 text-navy" strokeWidth={1.4} />
              <h3 className="mt-6 text-[18px] font-medium tracking-tight text-navy">
                Integraciones que ya existen
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                AFIP, Tango, MercadoLibre, Mercado Pago, obras sociales, bancos,
                balanzas y lectoras de código. Si tiene API o exporta un archivo,
                entra.
              </p>
            </SpotlightCard>
          </RevealItem>

          <RevealItem className="md:col-span-2">
            <SpotlightCard className="h-full p-7">
              <ShieldCheck className="h-6 w-6 text-navy" strokeWidth={1.4} />
              <h3 className="mt-6 text-[18px] font-medium tracking-tight text-navy">
                Soporte con SLA escrito
              </h3>
              <p className="mt-3 text-[15px] leading-[1.65] text-muted-foreground">
                Cuatro horas hábiles para incidentes que frenan la operación.
                Está en el contrato, no en una promesa de reunión.
              </p>
            </SpotlightCard>
          </RevealItem>

          {/* Celda ancha de cierre: la diferencia estructural */}
          <RevealItem className="md:col-span-4">
            <SpotlightCard className="h-full p-7 sm:p-9">
              <div className="flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">
                <div className="max-w-[60ch]">
                  <GitBranch className="h-6 w-6 text-navy" strokeWidth={1.4} />
                  <h3 className="mt-6 text-[21px] font-medium tracking-tight text-navy">
                    El código es tuyo. Literalmente.
                  </h3>
                  <p className="mt-3 text-[15.5px] leading-[1.65] text-muted-foreground">
                    Repositorio a tu nombre desde el primer commit, infraestructura
                    en tu cuenta y documentación de handoff. Si algún día querés
                    seguir con otro equipo, podés. Nadie queda rehén de nosotros.
                  </p>
                </div>
                <dl className="grid shrink-0 grid-cols-2 gap-x-10 gap-y-5 border-t border-border pt-6 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-0">
                  {[
                    { k: "Repos entregados", v: "23" },
                    { k: "Lock-in", v: "0" },
                  ].map((item) => (
                    <div key={item.k}>
                      <dt className="kicker mb-2">{item.k}</dt>
                      <dd className="tabular text-[28px] font-medium leading-none text-navy">
                        {item.v}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </SpotlightCard>
          </RevealItem>
        </RevealGroup>
      </div>
    </section>
  );
}

"use client";

import type { ComponentType, ReactNode } from "react";
import {
  LayoutGrid,
  Package,
  Truck,
  Receipt,
  Users,
  Settings,
  CalendarDays,
  Stethoscope,
  Syringe,
  Dumbbell,
  ClipboardList,
  LineChart,
  Paperclip,
} from "lucide-react";
import { QuellMark } from "@/components/brand/quell-mark";

/* ---------------------------------------------------------------------------
   Chrome compartido. Las tres maquetas usan el mismo marco a propósito: es el
   mismo producto base con distinto dominio encima, y mostrarlo así lo comunica
   sin tener que escribirlo.
--------------------------------------------------------------------------- */

type NavItem = { icon: ComponentType<{ className?: string; strokeWidth?: number }>; label: string; active?: boolean };

export function MockupShell({
  nav,
  product,
  breadcrumb,
  title,
  badge,
  children,
}: {
  nav: NavItem[];
  /** Sufijo del lockup: supply | clinic | coach */
  product: string;
  breadcrumb: string;
  title: string;
  badge: string;
  children: ReactNode;
}) {
  return (
    <div className="flex">
      <aside className="hidden w-[190px] shrink-0 border-r border-white/8 p-4 sm:block">
        <div className="mb-7 flex items-center gap-2 px-1 text-paper">
          <QuellMark className="h-5 w-5" />
          <span className="flex items-baseline gap-1 leading-none">
            <span className="text-[14px] font-semibold tracking-tight">
              quell
            </span>
            <span className="font-mono text-[9.5px] tracking-wide text-slate-300">
              {product}
            </span>
          </span>
        </div>
        <nav className="space-y-0.5">
          {nav.map((item) => (
            <div
              key={item.label}
              className={`flex items-center gap-2.5 rounded-[9px] px-2.5 py-2 text-[13px] ${
                item.active ? "bg-white/[0.09] text-paper" : "text-slate-300"
              }`}
            >
              <item.icon className="h-3.5 w-3.5" strokeWidth={1.6} />
              {item.label}
            </div>
          ))}
        </nav>
      </aside>

      <div className="min-w-0 flex-1 p-5 sm:p-6">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300">
              {breadcrumb}
            </p>
            <h3 className="mt-1.5 text-[17px] font-medium text-paper">{title}</h3>
          </div>
          <span className="rounded-[8px] border border-white/12 px-2.5 py-1 font-mono text-[10px] text-slate-300">
            {badge}
          </span>
        </div>
        {children}
      </div>
    </div>
  );
}

function KpiRow({ items }: { items: { label: string; value: string; delta: string }[] }) {
  return (
    <div className="mb-6 grid grid-cols-3 gap-2 sm:gap-2.5">
      {items.map((kpi) => (
        <div
          key={kpi.label}
          className="rounded-[11px] border border-white/8 bg-white/[0.03] p-3"
        >
          <p className="font-mono text-[9.5px] uppercase tracking-wider text-slate-300">
            {kpi.label}
          </p>
          <p className="mt-2 flex items-baseline gap-1.5">
            <span className="tabular text-[21px] font-medium leading-none text-paper">
              {kpi.value}
            </span>
            <span className="tabular font-mono text-[10px] text-slate-300">
              {kpi.delta}
            </span>
          </p>
        </div>
      ))}
    </div>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="whitespace-nowrap rounded-[6px] border border-white/12 px-2 py-0.5 text-[10.5px] text-slate-300">
      {children}
    </span>
  );
}

function Bar({ width }: { width: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="h-1 w-16 overflow-hidden rounded-full bg-white/10">
        <div className="h-full rounded-full bg-slate-500" style={{ width }} />
      </div>
      <span className="tabular font-mono text-[10px] text-slate-300">{width}</span>
    </div>
  );
}

/* ---------------------------------------------------------------------------
   1 · ERP — Abastecimiento
--------------------------------------------------------------------------- */

const ERP_ROWS = [
  ["OC-4821", "Aldabra SA", "Recepción parcial", "12/08", "72%"],
  ["OC-4820", "NORTEC", "En tránsito", "12/08", "40%"],
  ["OC-4818", "Delta Frío", "Completa", "11/08", "100%"],
  ["OC-4817", "Río Sur", "Aguardando remito", "11/08", "18%"],
  ["OC-4815", "Ferrenta", "Completa", "09/08", "100%"],
];

export function ErpMockup() {
  return (
    <MockupShell
      product="supply"
      breadcrumb="Abastecimiento"
      title="Órdenes de compra"
      badge="Semana 32 · 2026"
      nav={[
        { icon: LayoutGrid, label: "Tablero", active: true },
        { icon: Package, label: "Stock" },
        { icon: Truck, label: "Despachos" },
        { icon: Receipt, label: "Facturación" },
        { icon: Users, label: "Clientes" },
        { icon: Settings, label: "Ajustes" },
      ]}
    >
      <KpiRow
        items={[
          { label: "OC abiertas", value: "38", delta: "+4" },
          { label: "Días de stock", value: "11,4", delta: "−1,2" },
          { label: "Entregas a tiempo", value: "94%", delta: "+3" },
        ]}
      />

      <div className="overflow-hidden rounded-[11px] border border-white/8">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-white/8 bg-white/[0.03]">
              {["Orden", "Proveedor", "Estado", "ETA", "Avance"].map((head, i) => (
                <th
                  key={head}
                  className={`px-3 py-2 font-mono text-[9.5px] font-normal uppercase tracking-wider text-slate-300 ${
                    i > 2 ? "hidden sm:table-cell" : ""
                  }`}
                >
                  {head}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {ERP_ROWS.map((row) => (
              <tr key={row[0]} className="border-b border-white/[0.06] last:border-0">
                <td className="tabular px-3 py-2.5 font-mono text-[11px] text-paper">
                  {row[0]}
                </td>
                <td className="px-3 py-2.5 text-[12px] text-slate-100">{row[1]}</td>
                <td className="px-3 py-2.5">
                  <Chip>{row[2]}</Chip>
                </td>
                <td className="tabular hidden px-3 py-2.5 font-mono text-[11px] text-slate-300 sm:table-cell">
                  {row[3]}
                </td>
                <td className="hidden px-3 py-2.5 sm:table-cell">
                  <Bar width={row[4]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </MockupShell>
  );
}

/* ---------------------------------------------------------------------------
   2 · Salud — Historia clínica + stock de insumos
--------------------------------------------------------------------------- */

const EVOLUCIONES = [
  {
    fecha: "04/08",
    prof: "Dra. Sosa",
    tipo: "Control",
    texto: "TA 12/8. Refiere mejoría del dolor lumbar. Se reduce dosis a 50 mg/día.",
    adjuntos: 2,
  },
  {
    fecha: "18/07",
    prof: "Dr. Marín",
    tipo: "Práctica",
    texto: "Infiltración L4-L5 ecoguiada. Sin complicaciones. Descargo: 1 kit + 2 ampollas.",
    adjuntos: 1,
  },
  {
    fecha: "02/07",
    prof: "Dra. Sosa",
    tipo: "Primera consulta",
    texto: "Lumbalgia de 3 meses. Se solicita RMN. Antecedentes: HTA, sin alergias.",
    adjuntos: 3,
  },
];

const INSUMOS = [
  ["Kit infiltración", "14 u", "Mín. 10", "58%"],
  ["Lidocaína 2%", "6 u", "Mín. 12", "22%"],
  ["Guantes estériles M", "112 u", "Mín. 50", "90%"],
];

export function ClinicaMockup() {
  return (
    <MockupShell
      product="clinic"
      breadcrumb="Historia clínica"
      title="Paciente · M. Ferreyra"
      badge="HC 2841 · DNI 30.114.882"
      nav={[
        { icon: CalendarDays, label: "Agenda" },
        { icon: Users, label: "Pacientes", active: true },
        { icon: Stethoscope, label: "Historia clínica" },
        { icon: Syringe, label: "Insumos" },
        { icon: Receipt, label: "Obras sociales" },
        { icon: Settings, label: "Ajustes" },
      ]}
    >
      <KpiRow
        items={[
          { label: "Consultas 2026", value: "7", delta: "+1" },
          { label: "Próximo turno", value: "21/08", delta: "10:30" },
          { label: "Cobertura", value: "OSDE", delta: "210" },
        ]}
      />

      <div className="grid gap-2.5 lg:grid-cols-[1.6fr_1fr]">
        {/* Línea de tiempo de evoluciones */}
        <div className="overflow-hidden rounded-[11px] border border-white/8">
          <div className="border-b border-white/8 bg-white/[0.03] px-3 py-2">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-300">
              Evoluciones
            </span>
          </div>
          <ul>
            {EVOLUCIONES.map((item) => (
              <li
                key={item.fecha}
                className="border-b border-white/[0.06] px-3 py-3 last:border-0"
              >
                <div className="flex flex-wrap items-center gap-2">
                  <span className="tabular font-mono text-[11px] text-paper">
                    {item.fecha}
                  </span>
                  <Chip>{item.tipo}</Chip>
                  <span className="text-[11px] text-slate-300">{item.prof}</span>
                  {item.adjuntos > 0 && (
                    <span className="ml-auto flex items-center gap-1 font-mono text-[10px] text-slate-300">
                      <Paperclip className="h-3 w-3" strokeWidth={1.6} />
                      {item.adjuntos}
                    </span>
                  )}
                </div>
                <p className="mt-1.5 text-[12px] leading-relaxed text-slate-100">
                  {item.texto}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Stock de insumos, descontado por práctica */}
        <div className="overflow-hidden rounded-[11px] border border-white/8">
          <div className="border-b border-white/8 bg-white/[0.03] px-3 py-2">
            <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-300">
              Stock de insumos
            </span>
          </div>
          <ul className="p-3">
            {INSUMOS.map(([nombre, cant, min, pct]) => (
              <li key={nombre} className="mb-3.5 last:mb-0">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-[12px] text-slate-100">{nombre}</span>
                  <span className="tabular shrink-0 font-mono text-[11px] text-paper">
                    {cant}
                  </span>
                </div>
                <div className="mt-1.5 flex items-center justify-between gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${
                        parseInt(pct) < 30 ? "bg-slate-100" : "bg-slate-500"
                      }`}
                      style={{ width: pct }}
                    />
                  </div>
                  <span className="shrink-0 font-mono text-[9.5px] text-slate-300">
                    {min}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </MockupShell>
  );
}

/* ---------------------------------------------------------------------------
   3 · Fitness — Planificación semanal
--------------------------------------------------------------------------- */

const DIAS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

const PLAN: Record<string, { bloque: string; detalle: string } | null> = {
  Lun: { bloque: "Tren inferior", detalle: "Sentadilla 4×6 · 82,5 kg" },
  Mar: { bloque: "Empuje", detalle: "Press banca 5×5 · 70 kg" },
  Mié: null,
  Jue: { bloque: "Tracción", detalle: "Remo 4×8 · 60 kg" },
  Vie: { bloque: "Full body", detalle: "Peso muerto 3×5 · 110 kg" },
  Sáb: { bloque: "Aeróbico", detalle: "Z2 · 40 min" },
};

const ALUMNOS = [
  ["M. Quiroga", "Fuerza · Semana 6/12", "94%"],
  ["L. Bermúdez", "Recomposición · Semana 3/16", "71%"],
  ["F. Ayala", "Vuelta al entrenamiento", "48%"],
];

export function EntrenadorMockup() {
  return (
    <MockupShell
      product="coach"
      breadcrumb="Planificación"
      title="M. Quiroga · Mesociclo de fuerza"
      badge="Semana 6 de 12"
      nav={[
        { icon: Users, label: "Alumnos" },
        { icon: ClipboardList, label: "Planes", active: true },
        { icon: Dumbbell, label: "Ejercicios" },
        { icon: LineChart, label: "Seguimiento" },
        { icon: Receipt, label: "Cuotas" },
        { icon: Settings, label: "Ajustes" },
      ]}
    >
      <KpiRow
        items={[
          { label: "Adherencia", value: "94%", delta: "+6" },
          { label: "Tonelaje sem.", value: "12,4 t", delta: "+0,8" },
          { label: "Alumnos activos", value: "118", delta: "+5" },
        ]}
      />

      {/* Grilla semanal */}
      <div className="mb-2.5 overflow-hidden rounded-[11px] border border-white/8">
        <div className="grid grid-cols-3 gap-px bg-white/8 sm:grid-cols-6">
          {DIAS.map((dia) => {
            const item = PLAN[dia];
            return (
              <div key={dia} className="min-h-[92px] bg-navy-900 p-2.5">
                <p className="font-mono text-[9.5px] uppercase tracking-wider text-slate-300">
                  {dia}
                </p>
                {item ? (
                  <div className="mt-2 rounded-[8px] border border-white/12 bg-white/[0.05] p-2">
                    <p className="text-[11px] leading-tight text-paper">
                      {item.bloque}
                    </p>
                    <p className="tabular mt-1.5 font-mono text-[9.5px] leading-tight text-slate-300">
                      {item.detalle}
                    </p>
                  </div>
                ) : (
                  <p className="mt-2 font-mono text-[9.5px] text-slate-500">
                    Descanso
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Adherencia por alumno */}
      <div className="overflow-hidden rounded-[11px] border border-white/8">
        <div className="border-b border-white/8 bg-white/[0.03] px-3 py-2">
          <span className="font-mono text-[9.5px] uppercase tracking-wider text-slate-300">
            Adherencia de la semana
          </span>
        </div>
        <ul>
          {ALUMNOS.map(([nombre, plan, pct]) => (
            <li
              key={nombre}
              className="flex flex-wrap items-center gap-x-3 gap-y-1.5 border-b border-white/[0.06] px-3 py-2.5 last:border-0"
            >
              <span className="text-[12px] text-paper">{nombre}</span>
              <span className="font-mono text-[10px] text-slate-300">{plan}</span>
              <span className="ml-auto">
                <Bar width={pct} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </MockupShell>
  );
}

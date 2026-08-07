import { QuellLockup } from "@/components/brand/quell-mark";

const COLUMNS = [
  {
    title: "Productos",
    links: [
      { label: "Quell Supply — abastecimiento", href: "#plataforma" },
      { label: "Quell Clinic — salud", href: "#plataforma" },
      { label: "Quell Coach — fitness", href: "#plataforma" },
    ],
  },
  {
    title: "Servicios",
    links: [
      { label: "Software a medida", href: "#servicios" },
      { label: "Landing pages y sitios", href: "#servicios" },
      { label: "Integraciones", href: "#capacidades" },
    ],
  },
  {
    title: "Empresa",
    links: [
      { label: "Cómo trabajamos", href: "#capacidades" },
      { label: "Proceso", href: "#proceso" },
      { label: "Casos", href: "#casos" },
      { label: "Contacto", href: "#contacto" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto max-w-[1200px] px-5 py-16 sm:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <div className="text-navy">
              <QuellLockup />
            </div>
            <p className="mt-5 max-w-[34ch] text-[14.5px] leading-[1.65] text-muted-foreground">
              Software de gestión a medida, sistemas por suscripción y web para
              equipos que crecieron más rápido que sus herramientas.
            </p>
          </div>

          {COLUMNS.map((column) => (
            <nav key={column.title} aria-label={column.title}>
              <p className="kicker mb-5">{column.title}</p>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="-my-[13px] inline-flex min-h-11 cursor-pointer items-center text-[14.5px] text-navy transition-colors duration-200 hover:text-slate-700"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-border pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-slate-700">
            Quell Systems · Supply · Clinic · Coach · A medida · Web
          </p>
          <p className="font-mono text-[11px] text-slate-700">
            © {new Date().getFullYear()} Quell Systems
          </p>
        </div>
      </div>
    </footer>
  );
}

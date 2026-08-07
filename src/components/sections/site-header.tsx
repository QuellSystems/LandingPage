"use client";

import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import { QuellLockup } from "@/components/brand/quell-mark";

const LINKS = [
  { href: "#servicios", label: "Servicios" },
  { href: "#plataforma", label: "Productos" },
  { href: "#capacidades", label: "Cómo trabajamos" },
  { href: "#proceso", label: "Proceso" },
  { href: "#casos", label: "Casos" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  // Umbral en 24px: por debajo la barra queda transparente sobre el hero,
  // por encima toma fondo para que el texto no compita con el contenido.
  useMotionValueEvent(scrollY, "change", (latest) => setScrolled(latest > 24));

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <motion.div
        animate={{
          backgroundColor: scrolled
            ? "rgba(247,248,249,0.82)"
            : "rgba(247,248,249,0)",
          borderBottomColor: scrolled ? "#DDE3EA" : "rgba(221,227,234,0)",
        }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="border-b backdrop-blur-md"
      >
        <div className="mx-auto flex h-[68px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
          <a
            href="#top"
            className="inline-flex min-h-11 cursor-pointer items-center text-navy transition-opacity hover:opacity-70"
          >
            <QuellLockup animate />
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative inline-flex min-h-11 cursor-pointer items-center text-[14px] text-muted-foreground transition-colors duration-200 hover:text-navy"
              >
                {link.label}
                <span className="absolute inset-x-0 bottom-[13px] h-px origin-left scale-x-0 bg-accent transition-transform duration-200 group-hover:scale-x-100" />
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#contacto"
              className="hidden min-h-11 cursor-pointer items-center rounded-[14px] bg-accent px-5 text-[14px] font-medium text-paper transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent-dark sm:inline-flex"
            >
              Agendar diagnóstico
            </a>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label={open ? "Cerrar menú" : "Abrir menú"}
              className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-[12px] border border-border text-navy transition-colors hover:bg-slate-100 md:hidden"
            >
              {open ? (
                <X className="h-5 w-5" strokeWidth={1.6} />
              ) : (
                <Menu className="h-5 w-5" strokeWidth={1.6} />
              )}
            </button>
          </div>
        </div>

        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-border bg-paper md:hidden"
          >
            <ul className="mx-auto max-w-[1200px] px-5 py-3">
              {LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block cursor-pointer border-b border-border py-3.5 text-[15px] text-navy last:border-0"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  onClick={() => setOpen(false)}
                  className="mt-3 mb-1 block cursor-pointer rounded-[14px] bg-accent px-5 py-3 text-center text-[15px] font-medium text-paper"
                >
                  Agendar diagnóstico
                </a>
              </li>
            </ul>
          </motion.nav>
        )}
      </motion.div>
    </header>
  );
}

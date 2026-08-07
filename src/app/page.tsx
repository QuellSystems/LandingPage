import { ScrollProgress } from "@/components/ui/scroll-progress";
import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { Clients } from "@/components/sections/clients";
import { Problem } from "@/components/sections/problem";
import { Services } from "@/components/sections/services";
import { Platform } from "@/components/sections/platform";
import { Capabilities } from "@/components/sections/capabilities";
import { Process } from "@/components/sections/process";
import { Proof } from "@/components/sections/proof";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/site-footer";

/**
 * Orden de secciones según el patrón "Trust & Authority + Conversion" que
 * devolvió ui-ux-pro-max: hero con credibilidad → prueba → solución → CTA,
 * atravesado por el arco narrativo de "Scroll-Triggered Storytelling"
 * (problema → recorrido → solución → clímax).
 */
export default function Page() {
  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <main className="flex-1">
        <Hero />
        <Clients />
        <Problem />
        <Services />
        <Platform />
        <Capabilities />
        <Process />
        <Proof />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}

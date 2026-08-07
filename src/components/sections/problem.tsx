"use client";

import { ScrollRevealText } from "@/components/ui/scroll-reveal-text";
import { TextHighlighter } from "@/components/ui/text-highlighter";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const SYMPTOMS = [
  {
    n: "01",
    title: "El dato vive en tres lugares",
    body: "El stock en el sistema viejo, el stock real en una planilla, el verdadero en la cabeza del encargado. Pasa igual con las fichas de pacientes y con las rutinas de los alumnos.",
  },
  {
    n: "02",
    title: "Todo depende de una sola persona",
    body: "El cierre de mes, la agenda o el armado de planes lo sostiene alguien que sabe dónde tocar. Si se toma vacaciones, la operación espera.",
  },
  {
    n: "03",
    title: "El software enlatado no entró",
    body: "Se compró, se pagó la implementación y el equipo volvió a Excel y WhatsApp a los cuatro meses, porque el flujo no era el suyo.",
  },
  {
    n: "04",
    title: "Cobrar y hacer seguimiento son dos mundos",
    body: "La suscripción se cobra por un lado, el servicio se presta por otro y nadie sabe con certeza quién está al día ni quién dejó de venir.",
  },
];

export function Problem() {
  return (
    <section id="problema" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <Reveal>
          <p className="kicker mb-8 flex items-center gap-3">
            <span className="h-px w-8 shrink-0 bg-slate-300" />
            01 / Diagnóstico
          </p>
        </Reveal>

        <ScrollRevealText className="max-w-[22ch] text-[clamp(1.9rem,4.4vw,3.1rem)] font-medium leading-[1.14] tracking-[-0.03em]">
          Nadie se queda sin sistema. Se queda sin uno solo.
        </ScrollRevealText>

        <Reveal delay={0.1}>
          <p className="mt-9 max-w-[58ch] text-[17px] leading-[1.7] text-muted-foreground">
            Da igual si es una planta de 80 personas, un consultorio con tres
            profesionales o un entrenador con 120 alumnos: cuando la operación
            crece más rápido que las herramientas, nadie se detiene, improvisa. Y
            esa improvisación{" "}
            <TextHighlighter>
              <span className="font-medium text-navy">
                ya es el diseño funcional de tu sistema
              </span>
            </TextHighlighter>
            . Solo que está escrita en planillas, mensajes y costumbres, y no la
            mantiene nadie.
          </p>
        </Reveal>

        <RevealGroup className="mt-20 grid gap-x-14 gap-y-12 sm:grid-cols-2">
          {SYMPTOMS.map((item) => (
            <RevealItem key={item.n}>
              <div className="border-t border-border pt-6">
                <div className="mb-4 flex items-baseline gap-4">
                  <span className="font-mono text-[12px] text-slate-700">
                    {item.n}
                  </span>
                  <h3 className="text-[19px] font-medium tracking-tight text-navy">
                    {item.title}
                  </h3>
                </div>
                <p className="pl-[calc(2ch+1rem)] text-[15.5px] leading-[1.65] text-muted-foreground">
                  {item.body}
                </p>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}

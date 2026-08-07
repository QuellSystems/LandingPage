"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/ui/reveal";
import { sendContact, type ContactState } from "@/app/actions/contact";

const EXPECTATIONS = [
  "30 minutos por videollamada, sin presentación institucional",
  "Te preguntamos por un proceso concreto y lo dibujamos en vivo",
  "Te decimos si conviene un producto por suscripción o algo a medida",
  "Salís con un diagnóstico escrito, contrates o no",
];

const SERVICIOS = [
  "Quell Supply — compras, stock y despachos",
  "Quell Clinic — historia clínica y turnos",
  "Quell Coach — planificación y seguimiento",
  "Software de gestión a medida (ERP / SaaS)",
  "Landing page o sitio web",
  "Todavía no sé / otra cosa",
];

export function Contact() {
  const [state, formAction] = useActionState<ContactState, FormData>(
    sendContact,
    { status: "idle" }
  );
  const sent = state.status === "success";

  return (
    <section id="contacto" className="border-t border-border py-28 sm:py-36">
      <div className="mx-auto max-w-[1200px] px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_460px] lg:gap-20">
          <Reveal>
            <p className="kicker mb-8 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/60" />
              07 / Contacto
            </p>
            <h2 className="max-w-[16ch] text-[clamp(2rem,4.6vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.035em] text-navy">
              Contanos qué proceso te está frenando
            </h2>
            <p className="mt-6 max-w-[48ch] text-[16.5px] leading-[1.7] text-muted-foreground">
              La primera conversación es de diagnóstico, no de venta. Si lo que
              necesitás se resuelve con una suscripción a un producto que ya
              tenemos andando, te lo decimos y te ahorrás el desarrollo.
            </p>

            <ul className="mt-10 space-y-3.5">
              {EXPECTATIONS.map((item) => (
                <li key={item} className="flex gap-3 text-[15px] text-navy">
                  <Check
                    className="mt-0.5 h-4 w-4 shrink-0 text-accent"
                    strokeWidth={1.8}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-5 border-t border-border pt-7">
              <div>
                <p className="kicker mb-2">Email</p>
                <a
                  href="mailto:systemsquell@gmail.com"
                  className="-my-3 inline-flex min-h-11 cursor-pointer items-center font-mono text-[13.5px] text-navy underline-offset-4 hover:underline"
                >
                  systemsquell@gmail.com
                </a>
              </div>
              <div>
                <p className="kicker mb-2">Ubicación</p>
                <p className="font-mono text-[13.5px] text-navy">
                  Salta Capital · Remoto - presencial
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <div className="rounded-[22px] border border-border bg-surface p-7 sm:p-8">
              {sent ? (
                <div className="flex min-h-[380px] flex-col items-start justify-center">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-accent text-paper">
                    <Check className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <p className="mt-6 text-[19px] font-medium tracking-tight text-navy">
                    Recibido.
                  </p>
                  <p className="mt-2 max-w-[36ch] text-[15px] leading-[1.6] text-muted-foreground">
                    Te respondemos dentro del día hábil con dos o tres horarios
                    para la llamada.
                  </p>
                </div>
              ) : (
                <form action={formAction} className="space-y-5">
                  <Field
                    id="nombre"
                    label="Nombre y apellido"
                    autoComplete="name"
                  />
                  <Field
                    id="empresa"
                    label="Empresa"
                    autoComplete="organization"
                  />
                  <Field
                    id="email"
                    label="Email de trabajo"
                    type="email"
                    autoComplete="email"
                  />

                  <div>
                    <label
                      htmlFor="servicio"
                      className="mb-2 block text-[13.5px] font-medium text-navy"
                    >
                      ¿Qué estás buscando?
                    </label>
                    <select
                      id="servicio"
                      name="servicio"
                      required
                      defaultValue={SERVICIOS[0]}
                      className="w-full cursor-pointer appearance-none rounded-[14px] border border-border bg-background bg-[length:18px] bg-[right_14px_center] bg-no-repeat px-4 py-3 pr-11 text-[15px] text-navy transition-[border-color,box-shadow] duration-200 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-slate-500/35"
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='%235A6B80' stroke-width='1.8' stroke-linecap='round' stroke-linejoin='round'><path d='m6 9 6 6 6-6'/></svg>\")",
                      }}
                    >
                      {SERVICIOS.map((servicio) => (
                        <option key={servicio} value={servicio}>
                          {servicio}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="proceso"
                      className="mb-2 block text-[13.5px] font-medium text-navy"
                    >
                      ¿Qué proceso te está frenando?
                    </label>
                    <textarea
                      id="proceso"
                      name="proceso"
                      rows={4}
                      required
                      placeholder="Ej: el stock nunca coincide con el del depósito · las fichas de pacientes están en papel · armo las rutinas de 90 alumnos a mano en Excel."
                      className="w-full resize-none rounded-[14px] border border-border bg-background px-4 py-3 text-[15px] text-navy transition-[border-color,box-shadow] duration-200 placeholder:text-slate-700 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-slate-500/35"
                    />
                    <p className="mt-2 text-[12.5px] leading-snug text-muted-foreground">
                      Cuanto más concreto, más útil es la primera llamada.
                    </p>
                  </div>

                  {state.status === "error" && (
                    <p className="text-[13px] text-red-600">{state.message}</p>
                  )}

                  <SubmitButton />
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  autoComplete,
}: {
  id: string;
  label: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <div>
      {/* Label visible, nunca placeholder-como-label */}
      <label
        htmlFor={id}
        className="mb-2 block text-[13.5px] font-medium text-navy"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        autoComplete={autoComplete}
        className="w-full rounded-[14px] border border-border bg-background px-4 py-3 text-[15px] text-navy transition-[border-color,box-shadow] duration-200 focus-visible:border-navy focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-slate-500/35"
      />
    </div>
  );
}

function SubmitButton() {

  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="group flex w-full cursor-pointer items-center justify-center gap-2 rounded-[14px] bg-accent px-6 py-3.5 text-[15px] font-medium text-paper transition-[background-color,transform] duration-200 hover:-translate-y-px hover:bg-accent-dark disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Enviando…" : "Enviar y agendar"}
      {!pending && (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
          strokeWidth={1.8}
        />
      )}
    </button>
  );
}

